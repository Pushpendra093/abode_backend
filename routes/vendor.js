var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require("./multer")

/* GET users listing. */


   router.post("/search_vendor_property", function (req, res, next) {
     
    try{
       pool.query("select * from vendorproperties where mobileno=?",[req.body.mobileno],function (error, result) {
       //console.log('error',error,'result',result)
        if (error) {
             res.status(500).json({ status: false });
           }
           else 
           {
            if (result.length == 0) {
              res.status(200).json({ status: false });
            } else {
              res.status(200).json({ status: true, data: result[0] });
            }
          }
        }
      )
   
    }
    catch(e)
    {
       return res.status(500).json({status:false,message:'Server not responding plz contact administrator ....'})
    }

    
  });

  router.post('/add_vendors', function(req, res, next) {
    
    try{
       pool.query("insert into vendor ( firstname, lastname, emailid, mobileno, dob) values(?,?,?,?,?)",[req.body.firstname,req.body.lastname,req.body.emailid,req.body.mobileno,req.body.dob],function(error,result){
        if(error)
        { 
         
           return res.status(200).json({status:false,message:'Server Error(Database) ....'})
        }
        else
        {
         pool.query("insert into vendorproperties ( emailid, mobileno, propertyid, subpropertyid, propertystatus, address, placeoffer, amenities, pictures, placedescription, title, price, offerprice) values(?,?,?,?,?,?,?,?,?,?,?,?,?)",
         [
            req.body.emailid,
            req.body.mobileno,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
 
         ],function(error,result){  
          if(result)
         { return res.status(200).json({status:true,message:'add vendor seccesfully'})}
      
          })
       
        }
   
       })
   
    }
    catch(e)
    {
       return res.status(500).json({status:false,message:'Server not responding plz contact administrator ....'})
    }
   });


   router.post("/search_vendor_mobileno", function (req, res, next) {

      try{
         pool.query("select * from vendor where mobileno=?",[req.body.mobileno],function (error, result) {
             if (error) {
               res.status(500).json({ status: false });
             }
             else 
             {
              if (result.length == 0) {
                res.status(200).json({ status: false });
              } else {
                res.status(200).json({ status: true, data: result[0] });
              }
            }
          }
        )
     
      }
      catch(e)
      {
         return res.status(500).json({status:false,message:'Server not responding plz contact administrator ....'})
      }

      
    });

    ///////// for picture ////

    router.post("/update_vendor_properties_picture", upload.any(),function (req, res) {
 //console.log("Body:",req.body)
  //  console.log("files:",req.files)
  console.log("BODY:", req.body);
  console.log("FILE:", req.files);
  var oldpicture = JSON.parse(req.body.oldpicture);
  
  var temp = {};
  var i = 0;
  req.files.map((item, index) => {
    temp[i] = item.filename;
    i++;
  });
  console.log("temp one:", temp);
  console.log("OLD:", oldpicture);

  console.log("length:", Object.keys(oldpicture).length);
  if (Object.keys(oldpicture).length > 0) 
  {
    Object.values(oldpicture).map((item) => {
      console.log(i + "]:" + item);
      temp[i] = item;
      i++;
    });
  }
  console.log("temp two:", temp);
    
        pool.query( "update vendorproperties set pictures=? where mobileno=?", [JSON.stringify(temp), req.body.mobileno],
          function (error, result) {
            if (error) {
              console.log("Error:", error);
              return res.status(500).json({ status: false });
            } else {
             
             
              return res.status(200).json({ status: true,});
            }
          }
        );
      }
    );
    


    ////////// search vendor property by email/mobilno

    router.post("/update_vendor_properties", function (req, res) {
      var option = req.body.opr;
      console.log(req.body)
      switch (option) {
        case "ADD_VENDOR_PROPERTIES":
        
          pool.query(
            "update vendorproperties set propertyid=? where mobileno=?",
            [req.body.propertyid, req.body.mobileno],
            function (error, result) {
              if (error) {
                return res.status(500).json({ status: false });
              } else {
                return res.status(200).json({ status: true });
              }
            }
          );
          break;
    
        case "ADD_VENDOR_SUBPROPERTIES":
          pool.query(
            "update vendorproperties set subpropertyid=? where mobileno=?",
            [req.body.subpropertyid, req.body.mobileno],
            function (error, result) {
              if (error) {
                return res.status(500).json({ status: false });
              } else {
                return res.status(200).json({ status: true });
              }
            }
          );
          break;
    
        case "ADD_VENDOR_PROPERTY_STATUS":
          pool.query(
            "update vendorproperties set propertystatus=? where mobileno=?",
            [req.body.propertystatus, req.body.mobileno],
            function (error, result) {
              if (error) {
                return res.status(500).json({ status: false });
              } else {
                return res.status(200).json({ status: true });
              }
            }
          );
          break;
    
        case "ADD_VENDOR_ADDRESS":
          pool.query(
            "update vendorproperties set address=? where mobileno=?",
            [req.body.address, req.body.mobileno],
            function (error, result) {
              if (error) {
                console.log(error);
                return res.status(500).json({ status: false });
              } else {
                return res.status(200).json({ status: true });
              }
            }
          );
          break;
        case "ADD_VENDOR_PLACEOFFER":
          console.log(req.body)
          pool.query(
            "update vendorproperties set placeoffer=? where mobileno=?",
            [req.body.placeoffer, req.body.mobileno],
            function (error, result) {
              if (error) {
                console.log(error);
                return res.status(500).json({ status: false });
              } else {
                return res.status(200).json({ status: true });
              }
            }
          );
          break;
    
        case "ADD_VENDOR_AMENITIES":
         // console.log(req.body)
          pool.query(
            "update vendorproperties set amenities=? where mobileno=?",
            [req.body.amenities, req.body.mobileno],
            function (error, result) {
              if (error) {
                console.log(error);
                return res.status(500).json({ status: false });
              } else {
                return res.status(200).json({ status: true });
              }
            }
          );
          break;

          case "ADD_VENDOR_":
            console.log(req.body)
            pool.query(
              "update vendorproperties set amenities=? where mobileno=?",
              [req.body.amenities, req.body.mobileno],
              function (error, result) {
                if (error) {
                  console.log(error);
                  return res.status(500).json({ status: false });
                } else {
                  return res.status(200).json({ status: true });
                }
              }
            );
            break;  
    
        case "ADD_VENDOR_EXTRA_DETAILS":
          console.log(req.body)
          pool.query(
            "update vendorproperties set placedescription=?,title=?,price=?,offerprice=?,status='completed' where mobileno=?",
            [
              req.body.placedescription,
              req.body.title,
              req.body.price,
              req.body.offerprice,
              req.body.mobileno,
            ],
            function (error, result) {
              if (error) {
                console.log(error);
                return res.status(500).json({ status: false });
              } else {
                return res.status(200).json({ status: true });
              }
            }
          );
          break;
      }
    });
    


   

    router.post("/undate_vendor_properties", function (req, res, next) {
      console.log(req.body)

      pool.query("update vendorproperties set propertyid=? where mobileno=?",[req.body.propertyid,req.body.mobileno],function (error, result) {
        if(error)
        {
          res.status(500).json({ status: false });
        }
        else
        {
          res.status(200).json({ status: true });
        }
      })
        
    })

    

module.exports = router;

var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require("./multer")

/* GET users listing. */
router.get('/displayallproperties', function(req, res, next) {
     
    try{
       pool.query("select V.*,(select VU.firstname from vendor VU where VU.mobileno=V.mobileno )as firstname,(select VU.dob from vendor VU where VU.mobileno=V.mobileno )as dob,(select S.subpropertyname from subproperties S where V.subpropertyid=S.subpropertyid )as subpropertyname  from vendorproperties V",function(error,result){
        if(error)
        {
         
           return res.status(200).json({status:false,data:[]})
        }
        else
        { 
         
           return res.status(200).json({status:true,data:result})
        }
   
       })
   
    }
    catch(e)
    {
       return res.status(500).json({status:false,data:[]})
    }
   });
   

   router.get('/displayallstates', function(req, res, next) {
     
    try{
       pool.query("select * from states",function(error,result){
        if(error)
        { 
         
           return res.status(200).json({status:false,data:[]})
        }
        else
        {
         
           return res.status(200).json({status:true,data:result})
        }
   
       })
   
    }
    catch(e)
    {
       return res.status(500).json({status:false,data:[]})
    }
   });

   router.post('/displayallcities_by_stateid', function(req, res, next) {
   
    var q="select C.*,(select S.statename from states S where S.stateid=C.stateid )as statename from cities C where C.stateid like '%"+req.body.stateid+"%' "
   // console.log(q)

    try{
       pool.query(
          "select C.*,(select S.statename from states S where S.stateid=C.stateid )as statename from cities C where C.stateid like '%"+req.body.stateid+"%'"
          ,function(error,result){
        if(error)
        {  
         
           return res.status(200).json({status:false,data:[]})
        }
        else
        {
         
           return res.status(200).json({status:true,data:result})
        }
   
       })
   
    }
    catch(e)
    {
       return res.status(500).json({status:false,data:[]})
    }
   });

   router.post('/fatch_cityname_and_statename_by_cityid', function(req, res, next) {
     console.log(req.body)
      try{
         pool.query("select C.*,(select S.statename from states S where S.stateid=C.stateid )as statename from cities C where cityid=?",[req.body.cityid],function(error,result){
          if(error)
          {  
           
             return res.status(200).json({status:false,data:[]})
          }
          else
          {
           
             return res.status(200).json({status:true,data:result})
          }
     
         })
     
      }
      catch(e)
      {
         return res.status(500).json({status:false,data:[]})
      }
     });




module.exports = router;

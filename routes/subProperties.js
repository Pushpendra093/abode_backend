var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require("./multer")

/* GET home page. */
router.post('/addnewsubproperty', function(req, res, next) {

    try{
       pool.query("insert into subproperties (propertyid,subpropertyname,description) values(?,?,?)",[req.body.propertyid,req.body.subpropertyname,req.body.description],function(error,result){
        if(error)
        { 
         
           return res.status(200).json({status:false,message:'Server Error(Database) ....'})
        }
        else
        {
         
           return res.status(200).json({status:true,message:'Add Sub Property succesfully'})
        }
   
       })
   
    }
    catch(e)
    {
       return res.status(200).json({status:false,message:'Server not responding plz contact administrator ....'})
    }
   });


   router.get('/displayallsubproperty', function(req, res, next) {
     
      try{
         pool.query("select S.*,(select P.propertytype from properties P where P.propertyid=S.propertyid )as propertytype from subproperties S",function(error,result){
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


     router.post('/search_subproperty_by_propertyid', function(req, res, next) {
       console.log(req.body)
      try{
         pool.query("select S.*,(select P.propertytype from properties P where P.propertyid=S.propertyid )as propertytype from subproperties S  where propertyid=? ",[req.body.propertyid],function(error,result){
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

     router.get('/search_subproperty', function(req, res, next) {
      
     try{
        pool.query("select S.*,(select P.propertytype from properties P where P.propertyid=S.propertyid )as propertytype from subproperties S  ",function(error,result){
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



   router.post('/subproperty_edit_data', function(req, res, next) {
    
 try{
    pool.query("update subproperties set  propertyid=?, subpropertyname=?, description=? where subpropertyid=?",[req.body.propertyid,req.body.subpropertyname,req.body.description,req.body.subpropertyid],function(error,result){
     if(error)
     { 
     
        return res.status(200).json({status:false,message:'Server Error(Database) ....'})
     }
     else
     { 
        return res.status(200).json({status:true,message:'City Edit succesfully'})
     }

    })

 }
 catch(e)
 {
    return res.status(200).json({status:false,message:'Server not responding plz contact administrator ....'})
 }
});
     


  router.post('/subproperty_delete', function(req, res, next) {
   
    console.log(req.body)
   try{
      pool.query("delete from subproperties where subpropertyid=?",[req.body.subpropertyid],function(error,result){
         if(error)
       { 
        
          return res.status(200).json({status:false,message:'Server Error(Database) ....'})
       }
       else
       {
        
          return res.status(200).json({status:true,message:'Sub Property Delete succesfully'})
       }
  
      })
  
   }
   catch(e)
   {
      return res.status(200).json({status:false,message:'Server not responding plz contact administrator ....'})
   }
  });


module.exports = router;

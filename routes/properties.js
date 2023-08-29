var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require("./multer")

/* GET home page. */
router.post('/addnewproperty',upload.single('propertyicon'), function(req, res, next) {
    
    try{
       pool.query("insert into properties (propertytype,propertyicon) values(?,?)",[req.body.propertytype,req.file.filename],function(error,result){
        if(error)
        { 
         
           return res.status(200).json({status:false,message:'Server Error(Database) ....'})
        }
        else
        {
         
           return res.status(200).json({status:true,message:'Add Property succesfully'})
        }
   
       })
   
    }
    catch(e)
    {
       return res.status(200).json({status:false,message:'Server not responding plz contact administrator ....'})
    }
   });


   router.get('/displayallproperty', function(req, res, next) {
     
      try{
         pool.query("select * from properties ",function(error,result){
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

   router.post('/property_edit_data', function(req, res, next) {

    
 try{
    pool.query("update properties set  propertytype=? where propertyid=?",[req.body.propertytype,req.body.propertyid],function(error,result){
     if(error)
     { 
     
        return res.status(200).json({status:false,message:'Server Error(Database) ....'})
     }
     else
     { console.log(result)
        return res.status(200).json({status:true,message:'Property Edit succesfully'})
     }

    })

 }
 catch(e)
 {
    return res.status(200).json({status:false,message:'Server not responding plz contact administrator ....'})
 }
});
     
 router.post('/property_edit_icon',upload.single('propertyicon'), function(req, res, next) {
   
    
   try{
      pool.query("update properties set propertyicon=? where propertyid=?",[req.file.filename,req.body.propertyid],function(error,result){
       if(error)
       { 
        
          return res.status(200).json({status:false,message:'Server Error(Database) ....'})
       }
       else
       {
        
          return res.status(200).json({status:true,message:'Property Picture Updated succesfully'})
       }
  
      })
  
   }
   catch(e)
   {
      return res.status(200).json({status:false,message:'Server not responding plz contact administrator ....'})
   }
  });

  router.post('/property_delete', function(req, res, next) {
   
    
   try{
      pool.query("delete from properties where propertyid=?",[req.body.propertyid],function(error,result){
         if(error)
       { 
        
          return res.status(200).json({status:false,message:'Server Error(Database) ....'})
       }
       else
       {
        
          return res.status(200).json({status:true,message:'Property Delete succesfully'})
       }
  
      })
  
   }
   catch(e)
   {
      return res.status(200).json({status:false,message:'Server not responding plz contact administrator ....'})
   }
  });


module.exports = router;

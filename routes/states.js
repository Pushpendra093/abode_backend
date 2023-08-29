var express = require('express');
var router = express.Router();
var pool=require('./pool')

var upload=require("./multer")


/* GET home page. */

router.post('/addnewstates',upload.single('picture'), function(req, res, next) {
    
    try{
       pool.query("insert into states (statename,picture) values(?,?)",[req.body.statename,req.file.filename],function(error,result){
        if(error)
        { 
         
           return res.status(200).json({status:false,message:'Server Error(Database) ....'})
        }
        else
        {
         
           return res.status(200).json({status:true,message:'Add  States succesfully'})
        }
   
       })
   
    }
    catch(e)
    {
       return res.status(500).json({status:false,message:'Server not responding plz contact administrator ....'})
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
    

    router.post('/updatestates', function(req, res, next) {
    
      try{
         pool.query("update states set statename=? where stateid=?",[req.body.statename,req.body.stateid],function(error,result){
          if(error)
          { 
           
             return res.status(200).json({status:false,message:'Server Error(Database) ....'})
          }
          else
          {
           
             return res.status(200).json({status:true,message:'Update States succesfully'})
          }
     
         })
     
      }
      catch(e)
      {
         return res.status(500).json({status:false,message:'Server not responding plz contact administrator ....'})
      }
     });
     

     router.post('/deletestates', function(req, res, next) {
      try{
         pool.query("delete from states where stateid=?",[req.body.stateid],function(error,result){
          if(error)
          { 
           
             return res.status(200).json({status:false,message:'Server Error(Database) ....'})
          }
          else
          {
           
             return res.status(200).json({status:true,message:'delete States succesfully'})
          }
     
         })
     
      }
      catch(e)
      {
         return res.status(500).json({status:false,message:'Server not responding plz contact administrator ....'})
      }
     });

     router.post('/states_edit_icon',upload.single('picture'), function(req, res, next) {
   
    
      try{
         pool.query("update states set picture=? where stateid=?",[req.file.filename,req.body.stateid],function(error,result){
          if(error)
          { 
           
             return res.status(200).json({status:false,message:'Server Error(Database) ....'})
          }
          else
          {
           
             return res.status(200).json({status:true,message:'Picture Updated succesfully'})
          }
     
         })
     
      }
      catch(e)
      {
         return res.status(200).json({status:false,message:'Server not responding plz contact administrator ....'})
      }
     });
   
     
 
module.exports = router;

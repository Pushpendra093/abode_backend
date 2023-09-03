var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require("./multer")

/* GET home page. */
router.post('/add_new_amenities_option',upload.single('icon'), function(req, res, next) {
    
    try{
       pool.query("insert into amenitiesoption (amenitiesid, optionname, icon) values(?,?,?)",[req.body.amenitiesid,req.body.optionname,req.file.filename],function(error,result){
        if(error)
        { 
         
           return res.status(200).json({status:false,message:'Server Error(Database) ....'})
        }
        else
        {
         
           return res.status(200).json({status:true,message:'Add Amenities Option succesfully'})
        }
   
       })
   
    }
    catch(e)
    {
       return res.status(200).json({status:false,message:'Server not responding plz contact administrator ....'})
    }
   });

   router.get('/displayallamenities_vendor', function(req, res, next) {
      
      try{
         pool.query("select AO.*,(select amenities from amenities A where  A.amenitiesid =AO.amenitiesid )as amenities,GROUP_CONCAT(JSON_OBJECT('optionname',AO.optionname,'optionid',AO.optionsid,'icon',Ao.icon)) as optionlist from amenitiesoption AO group by AO.amenitiesid",function(error,result){
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


   router.get('/displayalloption', function(req, res, next) {
     
      try{
         pool.query("select AO.*,(select A.amenities from amenities A where AO.amenitiesid=A.amenitiesid )as amenities from amenitiesoption AO",function(error,result){
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
     router.post('/update_amenitiesoption', function(req, res, next) {
    
      try{
         pool.query("update amenitiesoption set amenitiesid=?,optionname=? where optionsid=?",[req.body.amenitiesid,req.body.optionname,req.body.optionsid],function(error,result){
          if(error)
          { 
           
             return res.status(200).json({status:false,message:'Server Error(Database) ....'})
          }
          else
          {
           
             return res.status(200).json({status:true,message:'Update Amenities succesfully'})
          }
     
         })
     
      }
      catch(e)
      {
         return res.status(500).json({status:false,message:'Server not responding plz contact administrator ....'})
      }
     });
     

 router.post('/amenitiesoption_edit_icon',upload.single('icon'), function(req, res, next) {
   
    
   try{
      pool.query("update amenitiesoption set icon=? where optionsid=?",[req.file.filename,req.body.optionsid],function(error,result){
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

  router.post('/delete_amenitiesoption', function(req, res, next) {
   
    
   try{
      pool.query("delete from amenitiesoption where optionsid=?",[req.body.optionsid],function(error,result){
         if(error)
       { 
        
          return res.status(200).json({status:false,message:'Server Error(Database) ....'})
       }
       else
       {
        
          return res.status(200).json({status:true,message:'Amenities Option Delete succesfully'})
       }
  
      })
  
   }
   catch(e)
   {
      return res.status(200).json({status:false,message:'Server not responding plz contact administrator ....'})
   }
  });

  router.post('/displayalloption_for_vendor', function(req, res, next) {
     
   try{
      pool.query("select * from amenitiesoption AO where amenitiesid=?",[req.body.amenitiesid],function(error,result){
       if(error)
       {  
        console.log(error)
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

router.post('/displayalloption_for_vendor', function(req, res, next) {
     
   try{
      pool.query("select * from amenitiesoption AO where amenitiesid=?",[req.body.amenitiesid],function(error,result){
       if(error)
       {  
        console.log(error)
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

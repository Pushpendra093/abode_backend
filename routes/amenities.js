var express = require('express');
var router = express.Router();
var pool=require('./pool')


/* GET home page. */

router.post('/addnewamenities', function(req, res, next) {
    
    try{
       pool.query("insert into amenities (amenities) values(?)",[req.body.amenities],function(error,result){
        if(error)
        { 
         
           return res.status(200).json({status:false,message:'Server Error(Database) ....'})
        }
        else
        {
         
           return res.status(200).json({status:true,message:'Add Amenities succesfully'})
        }
   
       })
   
    }
    catch(e)
    {
       return res.status(500).json({status:false,message:'Server not responding plz contact administrator ....'})
    }
   });
   
  
   router.get('/displayallamenities', function(req, res, next) {
     
     try{
        pool.query("select * from amenities",function(error,result){
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
    

    router.post('/update_amenities', function(req, res, next) {
    
      try{
         pool.query("update amenities set amenities=? where amenitiesid=?",[req.body.amenities,req.body.amenitiesid],function(error,result){
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
     

     router.post('/delete_amenities', function(req, res, next) {
      try{
         pool.query("delete from amenities where amenitiesid=?",[req.body.amenitiesid],function(error,result){
          if(error)
          { 
           
             return res.status(200).json({status:false,message:'Server Error(Database) ....'})
          }
          else
          {
           
             return res.status(200).json({status:true,message:'delete Amenities succesfully'})
          }
     
         })
     
      }
      catch(e)
      {
         return res.status(500).json({status:false,message:'Server not responding plz contact administrator ....'})
      }
     });

     
     
 
module.exports = router;

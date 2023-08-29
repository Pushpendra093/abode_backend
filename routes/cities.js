var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require("./multer")

/* GET home page. */


router.post('/addnewcity',upload.any(), function(req, res, next) {

  // console.log("Body:",req.body)
  // console.log("files:",req.files)
   var temp={}
    req.files.map((item,index)=>{
      temp[index]=item.filename
      
    })
    
   
    
    console.log(JSON.stringify(temp))
    
    try{
       pool.query("insert into cities (picture,stateid,cityname) values(?,?,?)",[JSON.stringify(temp),req.body.stateid,req.body.cityname],function(error,result){
        if(error)
        { 
         
           return res.status(200).json({status:false,message:'Server Error(Database) ....'})
        }
        else
        {
         
           return res.status(200).json({status:true,message:'Add City succesfully'})
        }
   
       })
   
    }
    catch(e)
    {
       return res.status(200).json({status:false,message:'Server not responding plz contact administrator ....'})
    }
   });


   router.get('/displayallcities', function(req, res, next) {
     
      try{
         pool.query("select C.*,(select S.statename from states S where S.stateid=C.stateid )as statename from cities C",function(error,result){
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

    

     router.post('/displayallcities_by_stateid_for_address', function(req, res, next) {
    
      
      try{
         pool.query(
            "select C.*,(select S.statename from states S where S.stateid=C.stateid )as statename from cities C where C.stateid=?"
            ,[req.body.stateid],function(error,result){
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



   router.post('/cities_edit_data', upload.any(),function(req, res, next) {

      // console.log("Body:",req.body)
  // console.log("files:",req.files)
   var picture=''
   req.files.map((item)=>{
     picture+=item.filename+","
   })
  
   picture=picture.substring(0,picture.length-1)
  // console.log(picture)
   
    
 try{
    pool.query("update cities set picture=?, stateid=?, cityname=? where cityid=?",[picture,req.body.stateid,req.body.cityname,req.body.cityid],function(error,result){
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
     
 
  router.post('/cities_delete_icon', function(req, res, next) {
   
    
   try{
      pool.query("delete from cities where cityid=?",[req.body.cityid],function(error,result){
         if(error)
       { 
        
          return res.status(200).json({status:false,message:'Server Error(Database) ....'})
       }
       else
       {
        
          return res.status(200).json({status:true,message:'City Delete succesfully'})
       }
  
      })
  
   }
   catch(e)
   {
      return res.status(200).json({status:false,message:'Server not responding plz contact administrator ....'})
   }
  });


module.exports = router;

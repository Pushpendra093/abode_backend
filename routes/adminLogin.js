var express = require('express');
var router = express.Router();
var pool=require("./pool")
var upload=require("./multer")

router.post('/checkadminlogin', function(req, res, next) {
   
    
    try{
       pool.query("select * from adminlogin where(emailid=? or mobileno=?)and password=? ",[req.body.emailid,req.body.emailid,req.body.password],function(error,result){
        if(error)
        { 
         
           return res.status(200).json({status:false,message:'Server Error(Database) ....'})
        }
        else
        { if(result.length==1)
         
           return res.status(200).json({status:true,data:result[0]})
           else
           return res.status(200).json({status:false,message:'Invalid Email'})
        }
   
       })
   
    }
    catch(e)
    {
       return res.status(200).json({status:false,message:'Server not responding plz contact administrator ....'})
    }
   });

module.exports = router;

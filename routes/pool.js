var mysql=require('mysql')

var pool=mysql.createPool({
    host:'database-1.cjjar2kbnaz3.us-east-1.rds.amazonaws.com',
    port:3306,
    user:'Abode',
    password:'PushJaat123',
    database:'abode',
    connectionLimit:100
})
module.exports=pool 


/*var pool=mysql.createPool({
    host:'localhost',
    port:3306,
    user:'root',
    password:'1234',
    database:'abode',
    connectionLimit:100
})
module.exports=pool */

//database-1.cjjar2kbnaz3.us-east-1.rds.amazonaws.com
//54.234.82.88 54.81.116.63
//ec2-54-234-82-88.compute-1.amazonaws.com  ec2-54-81-116-63.compute-1.amazonaws.com
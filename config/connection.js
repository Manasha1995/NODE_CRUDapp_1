
var mysql = require('mysql');
var db;
var settings = {
    host:"localhost",
    user:"root",
    password:"",
    database:"crudapp"
};

function connectDatabase(){
    if(!db){
        db = mysql.createConnection(settings);
        db.connect(function (err){
            if(!err){
                console.log("Database Conneted Successfully!!");
            }else{
                console.log("Error in database Connection !!!");
            }
        })
    }
    return db;
}

module.exports = connectDatabase(); 
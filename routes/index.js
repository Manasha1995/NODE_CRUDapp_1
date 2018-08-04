var express = require('express');
var router = express.Router();
var connection = require('../config/connection');

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM users',
    function (err,rows){
      if(err)throw err;
      console.log(rows);
      res.render('index',{users:rows});
    });
});


router.post('/addUser', function (req,res){
  const userdata = {
    fname : req.body.fname,
    lname : req.body.lname,
    email : req.body.email,
    prof : req.body.prof
  }
  console.log(userdata);
  connection.query("INSERT INTO users SET ?", userdata , function (err,result){
      if(err) throw err;
      res.redirect('/');
  });
});

router.get('/deleteUser/:id',function (req,res){
  var userid = req.params.id;
  console.log(userid);
  connection.query("DELETE FROM users WHERE id = ?",[userid],function (err,rows){
    if (err) throw err;
    res.redirect('/');
  });

});

router.get('/edit/:id',function(req,res){
  var userid = req.params.id;
  connection.query("SELECT * FROM users WHERE id =?",[userid],function (err,rows){
    if(err) throw err;
    res.render('edit',{userdata:rows});
  });
});


router.post('/UpdateUser/:id', function (req,res){
  //try{
  var updateId = req.params.id;

  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;
  var prof = req.body.prof;

  connection.query("UPDATE users SET fname=?,lname=?,email=?,prof=? WHERE id=?",[fname,lname,email,prof,updateId], function(err,respond){
    if(err) throw err;
    res.redirect('../../');
  });
  console.log(updateId);
/*}catch(error){
  console.log(error);
}*/
});


module.exports = router;

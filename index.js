var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyparser = require('body-parser');
var urlencode = bodyparser.urlencoded({extended:false});


var con = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1234',
    database : 'addmember'
});

app.get('/', function(req, res){
    res.send('Hello Mysql');
});

app.get('/getMember', function(req, res){
    var sql = "SELECT * FROM `member`";
    con.query(sql, function(err,result){
         var tmp = JSON.stringify(result);
         res.send(tmp);
    });
});

app.post('/addMember',urlencode, function(req, res){
    var sql = "INSERT INTO member (id, first_name, last_name, position, email) VALUES ('" + 
    req.body.id+"','"+req.body.first_name+"','"+req.body.last_name+"','"+req.body.position+"','"+req.body.email+"')";
    res.send(sql);
    con.query(sql, function(err){
        if (err) {console.log("Insert Failed");}else {console.log("Insert Success");}
    });
});

app.put('/updateMember', urlencode, function(req, res){
    var sql = "UPDATE member SET  position = '" + req.body.position + "' WHERE id = '" + req.body.id + "'";
    res.send(sql);
    con.query(sql, function(err,result){
        if(err){console.log("Update Failed");}else {console.log("Update Success");}
    });
});

app.delete('/delMember', urlencode, function(req, res) {
    var sql = "DELETE FROM member WHERE id = '" + req.body.id + "'";
    res.send(sql);
    con.query(sql, function(err,result){
        if(err) {console.log("Delete Failed");}else {console.log("Delete Success");}
    }); 
});


app.listen(3030, function(){
    console.log('Start On Port:3030');
});




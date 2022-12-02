const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
const Swal = require('sweetalert2');
const app = express();
const fs = require('fs');



app.use("/assets",express.static("assets"));
app.use("/",express.static("/"));
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodejs"
});
app.use(express.urlencoded());
// connect to the database
connection.connect(function(error){
    if (error) throw error
    else console.log("connected to the database successfully!")
});


app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
    
})
app.get("/main",function(req,res){
  res.sendFile(__dirname + "/main.html");
  
})

app.post("/",encoder, function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    connection.query("select * from utlisateurs where nom_utilisateur = ? and password = ?",[username,password],function(error,results,fields){
        if (results.length > 0) {
          res.cookie('app_username', req.body.username);
            res.redirect("/main");
        } else {
            res.redirect("/?m=1");
        }
        res.end();
    })
})

// when login is success
app.get("/welcome",function(req,res){
    res.sendFile(__dirname + "/main")
})



    app.post('/create_cv', function(request, response, next){
        const xhr = new XMLHttpRequest()

        // listen for `load` event
        xhr.onload = () => {
          // print JSON response
          if (xhr.status >= 200 && xhr.status < 300) {
            // parse JSON
            const response = JSON.parse(xhr.responseText)
            console.log(response)
          }
        }
        
        // create a JSON object
        const json = {
          email: 'eve.holt@reqres.in',
          password: 'cityslicka'
        }
        
        // open request
        xhr.open('POST', 'https://reqres.in/api/login')
        
        // set `Content-Type` header
        xhr.setRequestHeader('Content-Type', 'application/json')
        
        // send rquest with JSON payload
        xhr.send(JSON.stringify(json))
    
    });







// set app port 
app.listen(4000);
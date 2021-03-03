test clem

const http = require('http')  //adding a library in node.js
const fs = require('fs')  // all file handling we need
const mysql = require('mysql');
const express = require('express');
const app = express();
const port = 3000  //wich port to use

const server = http.createServer(function(req,res){  //server creation with request and response parameter
  res.writeHead(200,{'Content-Type' : 'text/HTML'})  //200 = status code
  fs.readFile('index.html', function(error, data){  //opening the index.html file and instruction in case of an error
    if (error){
      res.writeHead(404)
      res.write('Error : file not found')
    }
    else {
      res.write(data)
    }
    res.end()
  })
})

server.listen(port, function(error) {  //create server on port 3000
  if (error) {  //if an error occur
    console.log("Oops something went wrong", error)
  }
  else{
    console.log("Server listening on port " + port)
  }
})

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Stegosaure915",
  database: "prototypedb"
});

con.connect(function (err) {
    if (err) {
      console.log('error creating DB', err);
    }
    else {
      console.log("Connected!");
    }
})

// coucou je suis le test

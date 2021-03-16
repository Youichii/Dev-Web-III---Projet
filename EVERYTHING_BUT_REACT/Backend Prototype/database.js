const mysql = require('mysql');
const express = require('express');
const app = express();
const path = require('path');



const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Stegosaure915",
});

con.connect(function (err) {
    if (err) {
      console.log('error creating DB', err);
    }
    else {
      console.log("Connected!");
    }
})


app.use(express.static(path.join(__dirname, "html")), function(req, resp){  //create a route in express
  con.query("CREATE DATABASE IF NOT EXISTS nodemysql", function (err, result, row) {
      if (err) {
        console.log('error query');
      }
      else {
          console.log("Successful query");
      }
  })
});

app.listen(1337, () => {
  console.log('Server started on port 1337')
});

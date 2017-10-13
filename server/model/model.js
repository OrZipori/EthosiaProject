// the buissness logic
const express = require('express');
const router = express.Router();
const csv = require("fast-csv");
const fs = require('fs');

class Model {
  constructor(){}

  fetchData(userID, res) {
    var stream = fs.createReadStream("./server/model/db/db.csv");
    let response={};

    csv.fromStream(stream, {headers : true})
     .validate(function(data){
         // only retreive the correct user
         return data.id == userID;
     })
     .on("data-invalid", function(data) {
         // if user doesn't exists, return empty json object
         response = {};
     })
     .on("data", function(data){
         // return the correct data object
         response = data;
     })
     .on("end", function() {
         res.json(response);
     });
  }

  addRow(userData, res) {
    // using fast - csv api
    let csvStream = csv.createWriteStream({headers: true})
    let writableStream = fs.createWriteStream("./server/model/db/db.csv");

    writableStream.on("finish", function(){
      res.json({success: true});
    });

    csvStream.pipe(writableStream);
    csvStream.write({id: userData.id,
                     firstName: userData.firstName,
                     lastName: userData.lastName,
                     email: userData.email,
                     headline: userData.headline,
                     cellphone: userData.cellphone});
    csvStream.end();
  }
}

module.exports = new Model();

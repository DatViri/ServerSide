const express = require('express');
const bodyParser = require('body-parser');
const mongoClient = require('mongodb');
const multer = require('multer');


const app = express();
const upload = multer({dest: 'public/uploads'});

let db;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
mongoClient.connect('mongodb+srv://dattruong:7121997@image-view-q4pfx.mongodb.net/test?retryWrites=true'
    , (err, client)=>{
      if (err) return console.log(err);
      db = client.db('image-view-info')
      app.listen(port, () => {
        console.log('Running on port ' + port);
      });
    });

const port = process.env.PORT || 8080;

app.get('/api', (req, res) => {
  res.sendfile(__dirname + '/public/index.html');
});

app.get('/api/info', (req, res) =>{
  db.collection('info').find().toArray(function(err, results) {
    res.send(results);
  });
});

app.post('/api/upload', (req, res) => {
  db.collection('info').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.redirect('/api');
  });
});
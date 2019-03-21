const express = require('express');
const bodyParser = require('body-parser');
const mongoClient = require('mongodb');
const multer = require('multer');
const fs = require('fs');
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb+srv://dattruong:7121997@image-view-q4pfx.mongodb.net/test?retryWrites=true';


const app = express();
const upload = multer({limits: {fileSize: 1000000}, dest: 'public/uploads/'});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/api/upload', upload.single('picture'), (req, res, next)=>{
  if (req.file == null) {
    res.render('Please select a picture file to submit!');
  } else {
    mongoClient.connect(url, (err, client)=>{
      const newImg = fs.readFileSync(req.file.path);
      const encImg = newImg.toString('base64');
      const newItem = {
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        contentType: req.file.mimeType,
        size: req.file.size,
        img: new Buffer(encImg, 'base64'),
      };
      const db = client.db('image-view-info');
      db.collection('info').insertOne(newItem, (err, result)=>{
        if (err) {
          console.log(err);
        }
        console.log('saved to database');
        res.redirect('/api');
      });
    });
  }
});

app.get('/api/:picture', (req, res)=>{
  const filename = req.params.picture;
  mongoClient.connect(url, (err, client)=>{
    db = client.db('image-view-info');
    db.collection('info').findOne({'_id': ObjectId(filename)}, (err, result)=>{
      res.contentType('image/jpeg');
      res.send(result.img.buffer);
      console.log(result.category);
    });
  });
});


app.listen(3000, () => {
  console.log('Running on port 3000');
});

app.get('/api', (req, res) => {
  res.sendfile(__dirname + '/public/index.html');
});

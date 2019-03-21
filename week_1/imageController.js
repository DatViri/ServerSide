'use strict';
const fs = require('fs');
const ObjectId = require('mongodb').ObjectId;
const imageModel = require('./imageModel');


exports.uploadImage = (req, res)=>{
  if (req.file == null) {
    res.render('Please select a picture file to submit!');
  } else {
    const newImg = fs.readFileSync(req.file.path);
    const encImg = newImg.toString('base64');
    const newItem = {
      category: req.body.category,
      title: req.body.title,
      description: req.body.description,
      contentType: req.file.mimeType,
      size: req.file.size,
      image: new Buffer(encImg),
    };
    imageModel.create(newItem).then(()=>{
      console.log(newItem);
      res.redirect('/api/');
    });
  }
};

exports.getImage = (req, res) =>{
  const filename = req.params.id;
  imageModel.findById({'_id': ObjectId(filename)}, (err, result)=>{
    res.contentType('image/jpeg');
    res.send(Buffer.from(result.image, 'base64'));
    console.log(Buffer.from(result.image, 'base64'));
  });
};

exports.getAllImage = (req, res) =>{
  imageModel.find({}, (err, result)=>{
    if (err) throw err;
    // object of all the users
    console.log(result);
    res.send(result);
  });
};

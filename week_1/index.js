const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb)=> {
    cb(null, file.fieldname + '-' + Date.now() +
    path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
}).single('myImage');

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log('wrong');
    } else {
      const body = req.body;
      console.log(body);
    }
  });
});


app.listen(3000, ()=> console.log('Listening on port 3000'));


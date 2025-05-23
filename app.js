const express = require('express')
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')
const file = require('file-system');
const methodOverride = require('method-override')
const bodyParser = require('body-parser');
const { body, matchedData, validationResult } = require('express-validator');
const fs = require('fs');
const ejs = require('ejs')
const pageRoute = require('./routes/pageRoute');
const postModel = require('./Model/postModel');


const app = express()
const port = 3000;

app.set('views', './views')
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method', {methods: ['POST','GET','PUT','DELETE']}));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.static('public'))


app.use('/', pageRoute);


 mongoose.connect('mongodb://127.0.0.1:27017/agency-db')
  .then(() => console.log(' DB Connected!'))
  .catch(err => console.log(err));

  app.listen(port, () => {
    console.log(`Agency-app listening on port ${port}`)
  })
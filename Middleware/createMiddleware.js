
const express = require('express');
const router = express.Router();
const { body ,matchedData, validationResult } = require("express-validator");
const Swal = require('sweetalert2')

    

module.exports = [
  body('title').notEmpty().withMessage('Başlık boş olamaz'),
  body('subtitle').notEmpty().withMessage('Alt başlık boş olamaz'),
  body('projectName').notEmpty().withMessage('Proje adı boş olamaz'),
  body('category').notEmpty().withMessage('Kategori seçilmelidir'),
  
 
  body('image').custom((value, { req }) => {
    if (!req.files || !req.files.image) {
         throw new Error('Lütfen bir resim dosyası yükleyin');
  }

    const image = req.files.image;
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const extension = image.name.split('.').pop().toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      //throw new Error('Sadece jpg, jpeg, png, gif dosyaları yüklenebilir');
    throw new Error('Sadece jpg, jpeg, png, gif dosyaları kabul edilir');}
    
    return true;
  }),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     console.log("gelen hata", errors.array()[0].msg  );
      return res.status(400).json({ success: false, message: errors.array()[0].msg}); 
                 
    };
   
    next();
  }
  
];




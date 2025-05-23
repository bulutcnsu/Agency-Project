
const express = require('express');
const router = express.Router();
const { body ,matchedData, validationResult } = require("express-validator");
const Swal = require('sweetalert2')

    

module.exports = [
  body('title').notEmpty().withMessage('Title cannot be empty'),
  body('subtitle').notEmpty().withMessage('Subtitle cannot be empty'),
  body('projectName').notEmpty().withMessage('Project Name cannot be empty'),
  body('category').notEmpty().withMessage('Category must be chosen'),
  
 
  body('image').custom((value, { req }) => {
    if (!req.files || !req.files.image) {
         throw new Error('Please upload a image file');
  }

    const image = req.files.image;
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const extension = image.name.split('.').pop().toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      
    throw new Error('Only jpg, jpeg, png, gif files accepted');}
    
    return true;
  }),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
          return res.status(400).json({ success: false, message: errors.array()[0].msg}); 
                 
    };
   
    next();
  }
  
];




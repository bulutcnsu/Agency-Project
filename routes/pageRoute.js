const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload')
const postController = require('../Controller/postController')
const createMiddleware = require('../Middleware/createMiddleware')

router.route('/').get((req, res) => {
    res.render('index')
  })
    router.route('/services').get((req, res) => {
    res.render('services')
  })
  router.route('/about').get((req, res) => {
    res.render('about')
  })
  router.route('/team').get((req, res) => {
    res.render('team')
  })
  router.route('/contact').get((req, res) => {
    res.render('contact')
  })
   router.route('/contact/sendMessage').post(postController.sendMessage);
  router.route('/portfolio').get(postController.getAllPosts);
  router.route('/portfolio').post(createMiddleware,postController.createPost)
  router.route('/portfolio/:id').delete(postController.deletePost);
  router.route('/portfolio/:id').put(postController.updatePost);

  module.exports = router;
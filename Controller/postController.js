const Post = require("../Model/postModel");
const Category= require("../Model/categoryModel");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");

exports.createPost = async (req, res) => {


  const image = await req.files.image;
  const description = await req.body.description;

  const uploadPath = path.join(
    __dirname,
    "..",
    "public",
    "uploads",
    image.name
  );

  image.mv(uploadPath, async () => {
    await Post.create({
      description: description,
      ...req.body,
      image: image.name,
    });
     res.json({ success: true, message: 'Project created successfully!' ,redirect: '/portfolio'});
    
  });
}

exports.getAllPosts  = async(req,res) => {
  
  const posts = await Post.find({});
  const categories = await Category.find({});
    res.render('portfolio', {
    posts,
    categories
  });
}
 
exports.deletePost = async(req,res) => {
  const post = await Post.findOne({ _id: req.params.id });
  let deletedImage = path.join(__dirname, "..", "/public/uploads/") + post.image ;
  
  console.log(deletedImage);
  console.log(fs.existsSync(deletedImage));

  if (fs.existsSync(deletedImage)) {
    fs.unlink(deletedImage, (err) => {
      if (err) throw err;
 }) }
  await Post.findByIdAndDelete(req.params.id);
  res.redirect('/portfolio');

 }
 exports.updatePost = async(req,res) => {

  const post = await Post.findById(req.params.id);
    
   post.overwrite({
    title: req.body.title,
    subtitle : req.body.subtitle,
    description :req.body.description,
    projectName :req.body.projectName,
    image: post.image,
    detail: req.body.detail,
    category :req.body.category,
    client : req.body.client
  })
  await post.save();
 
res.json({ success: true, message: 'Project updated succesfully!' ,redirect: '/portfolio'});
};

exports.sendMessage = async(req,res)=> {

  const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
        user: "",
        pass: "",
  },
  });

await  transport.sendMail({
  sender: req.body.email,
  to : "",
  replyTo: req.body.email,
  subject: "Node Mailer Message",
  text: req.body.message+
   " "+ req.body.name + " " + req.body.phone

 })
  .then(() => res.json({ success: true, message: 'Mail sent successfully!' ,redirect: '/contact' }))
  .catch(() => res.json({error:true, message:'Mail could not sent',redirect: '/contact' }))

}


 

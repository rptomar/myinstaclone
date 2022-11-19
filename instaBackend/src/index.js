const express = require('express')
const app = express()
const port = process.env.PORT || 8081
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const cloudinary = require('cloudinary').v2;
require("dotenv").config({path:"./.env"})

  cloudinary.config({
    secure: true,
     cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET
  });


const mongoose = require('mongoose');
async function main() {
  await mongoose.connect( process.env.MONGODB_URI);
  }
main().catch(err => console.log(err)).then(()=>console.log("db connected"));

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

const post=require("../database/model/postschema")
 
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

app.post('/posts',multipartMiddleware, (req, res) => {
  let imageFile=req.files.images.path
  const{name,Location,Description}=req.body
  cloudinary.uploader.upload(imageFile,
  function(error, result){
    if(error){
      console.log(error);
      res.send(JSON.stringify({status:"failure",message:'err while uploading to cloudinary'}))
      return
    }
   }).then(
    function (image) {
      if(image){
        let currentPost=new post({
          name:name,
          location:Location,
          description: Description,
          postImage: image.secure_url,
          date: new Date()
        })
        currentPost.save().then((data)=>{
          res.send(JSON.stringify({status:"sucess",message:'post created and updated',data:data}) )
        } )
      }
    }
   );
})

//get all posts
app.get('/posts', (req, res) => {
  post.find({}, function(err, data) {
    if(data){
      let sorted=data.sort((a,b)=>{
        let aGetMilli=new Date(a.date).getMilliseconds()
        let token1=new Date(a.date).setMilliseconds(aGetMilli)
        let bGetMilli=new Date(b.date).getMilliseconds()
        let token2=new Date(b.date).setMilliseconds(bGetMilli)
        return token2-token1
      })
      res.send(sorted)
    }else{
    res.send()
    }
 
  });
})



//likes update
app.put('/posts/:id', (req, res) => {
  const {id}=(req.params)
  var objid = mongoose.Types.ObjectId(id);
  post.updateOne({ _id: objid}, {likes:30}, function(err, data) {
    console.log(data)
  });
  res.send('likes updated')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
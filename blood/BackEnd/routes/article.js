const express = require('express')
const router = express.Router()
const Article = require('../models/article')

// Upload image
const multer = require('multer');
// const filename = '' ;
let filename = '' ;




// const mystorage = multer.diskStorage({
//     destination: './uploads',
//     filename: (req, file, redirect) => {
//         let date = Date.now();
//         let fl = date + '.' + file.mimetype.split('/')[1];
//         redirect(null, fl);
//         filename = fl;
//     }
// });
// const upload = multer({ storage: mystorage });
const mystorage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
        let date = Date.now();
        let fl = date + '.' + file.mimetype.split('/')[1];
        callback(null, fl);
        filename = fl; //
    }
});
//medel wire
const upload = multer({ storage: mystorage });

router.post('/ajout', upload.any('image'), (req, res) => {
    let data = req.body;
    let article = new Article(data);
    article.date = new Date();
    article.image = filename;
    article.tags = data.tags.split(',');

    article.save()
        .then((saved) => {
            filename = '';
            res.status(200).send(saved);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

router.get('/all', (req, res) => {
    Article.find()
    .then(
        (added)=>{
            res.send(added)
        } 
        )
     .catch(
          (e)=>{
            res.send(e)
        }
     ) 
     
});

router.get('/getbyid/:id', (req, res) => {
    let id = req.params.id
    Article.findById({_id:id})   
    .then(
        (added)=>{
            res.send(added)
        } 
        )
     .catch(
          (e)=>{
            res.send(e)
        }
     ) 
});

router.get('/getbyidauthor/:id', (req, res) => {
    let id = req.params.id

    Article.find({idAuthor:id})   
    .then(
        (article)=>{
            res.status(200).send(article)
        } 
        )
     .catch(
          (e)=>{
            res.status(400).send(e)
        }
     ) });
// **************Filtre**
  router.get('/getDon' ,async (req,res)=>{
    try{
      let done = await Article.find({title : 'Je don du sang'}) 
      res.send(done)
    }
    catch (e){
        res.send(e)
    }
  })
  router.get('/getBesoin' ,async (req,res)=>{
    try{
      let done = await Article.find({title : 'Je besoin de sang'}) 
      res.send(done)
    }
    catch (e){
        res.send(e)
    }
  })
// **************
router.delete('/supprimer/:id', (req, res) => {
    let id = req.params.id
    Article.findByIdAndDelete({_id:id})
    .then(
        (added)=>{
            res.send(added)
        } 
        )
     .catch(
          (e)=>{
            res.send(e)
        }
     )
});

router.put('/update/:id', upload.any('image'), (req, res) => {
    let id = req.params.id
    let data = req.body
    data.tags = data.tags.split(',');

    // if(req.image.filename.length > 0){
    //     // data.image = filename ;
    // }

// if (req.file && req.file.length > 0 && req.file.filename.length > 0) {
    // Update these lines: to:
if (req.files && req.files.length > 0 && req.files[0].filename.length > 0) {
        data.image = req.file.filename;
    }


    Article.findByIdAndUpdate({_id:id} , data)
    .then(
        (article)=>{
            // filename='';
            res.status(200).send(article)
        } 
        )
     .catch(
          (e)=>{
            res.status(400).send(e)
        }
     )});

     router.get('/chat' , (req,res)=>{
        res.sendFile(__dirname + "/views/chat.html")
     })

module.exports = router;

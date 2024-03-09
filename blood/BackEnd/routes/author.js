const express = require('express')

const router = express.Router();
const Author = require('../models/author')

const multer = require('multer');
const jwt = require('jsonwebtoken');

//mot de passe crypte
const bcrypt = require('bcrypt') ;


const filename = '' ;
// const mystorage = multer.diskStorage({
//     destination: './uploads',
//     filename: (req, file, callback) => {
//         let date = Date.now();
//         let fl = date + '.' + file.mimetype.split('/')[1];
//         callback(null, fl);
//         filename = fl;
//     }
// });
const mystorage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
        let date = Date.now();
        let fl = date + '.' + file.mimetype.split('/')[1];
        callback(null, fl);
        // You can also set filename directly on the request object
        req.filename = fl;
    }
});

const upload = multer({ storage: mystorage });


router.post('/register', upload.any('image'), (req, res) => {
    data = req.body;
    author = new Author(data);

    author.image = req.filename; // Use req.filename here

    salt = bcrypt.genSaltSync(10);
    author.password = bcrypt.hashSync(data.password, salt);
    author.role = 'Author';
    author.save()
        .then(
            (savedAuthor) => {
                // filename = ""; // No need to reset filename globally
                res.status(200).send(savedAuthor);
            }
        )
        .catch(
            err => {
                res.send(err);
            }
        );
});


router.post('/login' , (req , res)=>{
    data = req.body;
    Author.findOne({email:data.email})
      .then(
        (author)=>{
            let valid = bcrypt.compareSync(data.password , author.password);
            if (!valid){
               res.send('email or password invalid');
            }else{
              //create token : //medel wire  :
              let payload = {
                _id: author._id,
                email:author.email,
                fullname:author.name + ' ' + author.lastname
              }
              let token = jwt.sign(payload , '123')
              res.json({token:token , userId:author._id , role:author.role })  
              //res.send({mytoken:token})
            }
        }
      )
    .catch(
        err=>{
            res.send(err)
        }
    )
})

router.get('/all' , (req , res)=>{
   Author.find({})
   .then(
    (savedAuthor)=>{
        res.status(200).send(savedAuthor);
    }
)
.catch(
    err=>{
        res.send(err)
    }
)

})

router.get('/getbyid/:id' , (req , res)=>{
    let id = req.params.id
    Author.findById({_id : id})
    .then(
        (savedAuthor)=>{
            res.status(200).send(savedAuthor);
        }
    )
    .catch(
        (err)=>{
            res.send(err)
        }
    )
})

router.delete('/supprimer/:id' , (req , res)=>{
    let id = req.params.id
    Author.findOneAndDelete({_id:id})
    .then(
        (savedAuthor)=>{
            res.status(200).send(savedAuthor);
        }
    )
    .catch(
        (err)=>{
            res.send(err)
        }
    )
})

router.put('/update/:id' , (req , res)=>{
    let id = req.params.id
    data = req.body;
    // if (req.file && req.file.length > 0 && req.file.filename.length > 0) {
    //     data.image = req.file.filename;
    // }
    Author.findByIdAndUpdate({_id:id} , data)
    .then(
        (savedAuthor)=>{
            res.status(200).send(savedAuthor);
        }
    )
    .catch(
        err=>{
            res.send(err)
        }
    )

})

// 
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
     
})


//update without  image
// router.put('/update/:id' , (req , res)=>{
//     let id = req.params.id
//    let newData = req.body
//    Clientt.findOneAndUpdate({_id : id} , {name : newData.name , lastname : newData.lastname , email : newData.email , password : newData.password , about : newData.about , bloodType : newData.bloodType})
//    .then(
//     (done)=>{
//         res.send(done)
//     }
//     )
//     .catch(
//         (e)=>{
//             res.send(e)
//         }
//     )

// })




module.exports = router
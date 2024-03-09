const express = require('express');
const router = express.Router();
const AvisUser = require('../models/avis')

router.get('/all' , (req,res)=>{
    AvisUser.find()
    .then(
        (add)=>{
            res.status(200).send(add)
        } 
        )
     .catch(
          (e)=>{
            res.status(400).send(e)
        }
     )});


     router.post('/ajout', (req, res) => {
        let data = req.body;
        let avisuser = new AvisUser(data);
        avisuser.save()
            .then((saved) => {
                res.status(200).send(saved);
            })
            .catch((err) => {
                res.status(400).send(err);
            });
    });

    
 router.delete('/supprimer/:id' , (req , res)=>{
    let id = req.params.id ;
    AvisUser.findOneAndDelete({_id : id})
    .then(
        (article)=>{
            res.status(200).send(article)
        } 
        )
     .catch(
          (e)=>{
            res.status(400).send(e)
        }
     )});


module.exports = router
const mongoose = require('mongoose')

const Author = mongoose.model('Author' , {
    name:{
        type:String
    },
    lastname:{
        type:String
    },
    email:{
        type:String,
        unique: true
    },
    password:{
        type:String
    }, 
    role : {
        type: String,
    },
    about:{
        type:String
    },
    bloodType:{
        type: String  // A+ B+ AB+ O- O+
    },
    image:{
        type:String
    }
})



module.exports = Author ;
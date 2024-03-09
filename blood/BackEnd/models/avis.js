const mongoose = require('mongoose');

const AvisUser = mongoose.model('AvisUser', {
    avis : {
        type: String
    },
    idUser : {
        type: String 
    }
})



module.exports = AvisUser ;
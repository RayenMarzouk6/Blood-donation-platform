const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/blood')
.then(
    ()=>{
      console.log("server work (👉ﾟヮﾟ)👉")
    }
)
.catch(
    (err)=>{
        console.error(`Error ${err}`);
    }
)

module.exports = mongoose ;
const express = require('express') ;
const articleApi = require('./routes/article');
const authorApi = require('./routes/author');
const avisApi = require('./routes/avis');
const cors = require('cors');

require('./config/connect');


const app = express() 

app.use(express.json())
app.use(cors()); 

app.use('/article' , articleApi);
app.use('/author' , authorApi);
app.use('/avis' , avisApi);

app.use('/getimage' , express.static('./uploads')) ;

app.get('/chat' , (req , res)=>{
   res.sendFile(`${__dirname}/views/chat.html`)
   console.log(__dirname)
})

app.listen(3000 , 
  ()=>{
    console.log("Server is running on port 3000")
  }
)



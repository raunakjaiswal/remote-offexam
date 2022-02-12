const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.mongourl, {
    useNewUrlParser: true,
   
}).then(res=>{
    console.log('connected')
})

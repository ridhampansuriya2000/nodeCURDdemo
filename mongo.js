const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGOURI).then((res)=>{
    console.log(`Database is connected with :->  ${process.env.MONGOURI}`)
}).catch((error)=>{
    console.log("error in database connection : ",error)
});
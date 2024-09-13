const mongoose = require('mongoose')
const env = require('dotenv')
env.config()

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.g02l0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(()=>{
    console.log("Database connected")

}).catch((err)=>{
    console.log("database not connected", err)
})


module.exports={mongoose}


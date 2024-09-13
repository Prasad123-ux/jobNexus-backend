const mongoose = require('mongoose')

mongoose.connect(`mongodb://0.0.0.0/jobNexus`)
.then(()=>{
    console.log("Database connected")

}).catch(()=>{
    console.log("database not connected")
})


module.exports={mongoose}


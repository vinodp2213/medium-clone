const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/medium-clone', { useNewUrlParser : true })
.then(function(){
    console.log('connected to DB')
})
.catch(function(){
    console.log('something went wrong in DB connection')
})

module.exports = { 
    mongoose
}
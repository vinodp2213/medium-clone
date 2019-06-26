const mongoose = require('mongoose')

const Schema = mongoose.Schema

const topicSchema = new Schema({
    topicName : {
        type : String,
        required : true
    }
})

const Topic = mongoose.model('Topic', topicSchema)

module.exports = {
    Topic
}
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tagsSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    stories : [{
        type : Schema.Types.ObjectId,
        ref : 'Story'
    }]
})

const Tags = mongoose.model('Tags', tagsSchema)

module.exports = {
    Tags
}
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const storySchema = new Schema({
    title : { 
        type :String,
        required : true
    }, 
    description : {
        type  : String,
        required : true
    },
    body : {
        type : String,
        requirec : true
    },
    storyImageUrl : {
        type : String,
        required : true
    },
    response : [{
        type : Schema.Types.ObjectId,
        ref : 'Response'
    }],
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    createdAt : {
        type  : Date,
        default : Date.now
    },
    topic : {
        type : String
    },
    selectedTag : [{
        type : Schema.Types.ObjectId,
        ref : 'Tags'
    }]
})

const Story = mongoose.model('Story', storySchema)

module.exports = { 
    Story
}
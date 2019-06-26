const express = require('express')
const router = express.Router() 
const { Story } = require('../models/story')
const { User } = require('../models/user')
const {Tags} = require('../models/tag')
const multer = require('multer')
const {authenticateUser} = require('../middlewares/authentication')

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, './uploads/') 
    },
    filename : function(req, file, cb){
        cb(null, Date.now()+file.originalname)
    }
})
const filefilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ){
        cb(null, true)
    }else{
        cb(null, false)
    }
}
const upload = multer({ 
    storage: storage, 
    limits : {
        fileSize : 1024 * 1024 * 5
    },
    fileFilter : filefilter
})


router.get('/', authenticateUser, function(req, res){
    Story.find({user : req.user._id})
        .then(function(story){
            res.send(story)
        })
        .catch(function(err){
            res.send(err)
        })
})

router.post('/', authenticateUser, upload.single('storyImageUrl'), function(req, res, next){
    console.log(req.file)
    const imageUrl = "http://localhost:3005"+req.file.destination.slice(1, (req.file.destination.length))+req.file.filename
    const story = new Story({
        title : req.body.title,
        description : req.body.description,
        body : req.body.body,
        topic : req.body.topic,
        selectedTag : req.body.selectedTag,
        storyImageUrl : imageUrl
    })
    story.user = req.user._id
    story.save()
        .then(function(story){

            //storing the storyid in the user schema
            User.update({
                _id : req.user._id
            },
            {
                $push:{
                    stories : story._id
                }
            }).exec(function(err, user){
                console.log('story id is added to users')
            })

            let selectedTag = story.selectedTag.toString()
            Tags.update({
                selectedTag : selectedTag
            },
            {
                $push:{
                    stories : story._id
                }
            }).exec(function(err, selectedTag){
                console.log('story id is added to tags')
            })
            res.send(story)
        })
        .catch(function(err){
            res.send(err)
        })
 })

router.get('/:id', authenticateUser, function (req, res) {
    const id = req.params.id
    Story.findOne({
        user : req.user._id,
        _id : id
    }).populate('user').populate('response').populate('selectedTag')
    .then(function (story) {
        res.send(story)
    })
    .catch(function (err) {
            res.send(err)
        })
})

router.delete('/:id',authenticateUser, function (req, res) {
    const id = req.params.id
    Story.findOneAndDelete({
        user : req.user._id,
        _id : id
    })
        .then(function (story) {
            res.send(story)
        })
        .catch(function (err) {
            res.send(err)
        })
})

router.put('/:id', authenticateUser, function (req, res) {
    const id = req.params.id
    const body = req.body
    Story.findOneAndUpdate({
        user : req.user._id,
        _id : id
    }, { $set: body }, { new: true, runValidators: true })
        .then(function (story) {
            res.send(story)
            console.log(user.username)
        })
        .catch(function (err) {
            res.send(err)
        })
})



module.exports = {
    StoryRouter : router
}


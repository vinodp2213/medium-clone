const express = require('express')
const router = express.Router() 
const {Response} = require('../models/response')
const { Story } = require('../models/story')
const {authenticateUser} = require('../middlewares/authentication')


router.get('/:id', authenticateUser, function(req, res){
    const id = req.params.id
    Story.findById(id)
        .then(response => console.log(response.data))
})

router.post('/:id', authenticateUser, function(req, res){
    const id = req.params.id
    const {user} = req
    const body = req.body
    const response = new Response(body)
    response.user = user._id
        Story.findById(id)
        .then(function(story){
            story.response.push(response)
            story.save()
            .then(function(story){
                res.send(story)
            })
            .catch(function(err){
                res.send(err)
            })
        })
        .catch(function(err){
            res.send(err)
        })
})


module.exports = {
    ResponseRouter : router
}

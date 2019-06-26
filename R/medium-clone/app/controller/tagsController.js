const express = require('express')
const router = express.Router()
const { Tags } = require('../models/tag')

router.get('/', function (req, res) {
    Tags.find()
        .then(function (tag) {
            res.send(tag)
        })
        .catch(function (err) {
            res.send(err)
        })
})


router.post('/', function(req, res){
    const body = req.body
    const tag = new Tags(body)
    tag.save()
        .then(function(tag){
            res.send(tag)
        })
        .catch(function(err){
            res.send(err)
        })
})

router.get('/:id', function (req, res) {
    const id = req.params.id
    Tags.findById(id)
    .then(function(tag){
        res.send(tag)
    })
    .catch(function(err){
        res.send(err)
    })
})

router.put('/:id', function(req, res){
    const body = req.body
    const id = req.params.id
    Tags.findByIdAndUpdate(id, { $set: body }, { new: true, runValidators: true })
    .then(function(tag){
        res.send(tag)
    })
    .catch(function(err){
        res.send(err)
    })
})

router.delete('/:id', function(req, res){
    const id = req.params.id
    Tags.findByIdAndDelete(id)
    .then(function(tag){
        res.send(tag)
    })
    .catch(function(err){
        res.send(err)
    })
})

module.exports = {
    tagsRouter : router
}
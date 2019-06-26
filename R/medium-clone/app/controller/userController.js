const express = require('express')
const router = express.Router()
const { User } = require('../models/user')
const { authenticateUser } = require('../middlewares/authentication')


router.get('/:id', function (req, res) {
    const id = req.params.id
    User.findById(id)
    .then(function(user){
        res.send(user)
    })
    .catch(function(err){
        res.send(err)
    })
})


router.post('/register', function(req, res){
    const body = req.body
    const user = new User(body)
    user.save()
    .then(function(user){
        res.send(user)
    })
    .catch(function(err){
        res.send(err)
    })
})

router.post('/login', function(req, res){
    const body = req.body
    User.findByCredentials(body.email, body.password)
        .then(function(user){
            return user.generateToken()
        })
        .then(function(token){
            res.send({token})
        })
        .catch(function(err){
            res.status(404).send(err)
        })
})

router.get('/account', authenticateUser, function(req, res){
    const { user } = req
    res.send(user)
})

router.delete('/logout', authenticateUser, function(req, res){
    const { user, token } = req
    User.findByIdAndUpdate(user._id, { $pull : {tokens : {token : token }}})
    .then(function(){
        res.send({notice : 'successfully logged out'})
    })
    .catch(function(err){
        res.send(err)
    })
    
})

module.exports = {
    userRouter : router
}
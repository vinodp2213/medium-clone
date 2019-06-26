const express = require('express')
const { mongoose } = require('./config/database')
const port = 3005
const {userRouter} = require('./app/controller/userController')
const { topicRouter } = require('./app/controller/topicController')
const { StoryRouter } = require('./app/controller/storiesController')
const { tagsRouter } = require('./app/controller/tagsController')
const { ResponseRouter } = require('./app/controller/responseController')
const app = express()

const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use('/users', userRouter)
app.use('/topics', topicRouter)
app.use('/stories', StoryRouter)
app.use('/tags', tagsRouter)
app.use('/response', ResponseRouter)


app.listen(port, function(){
    console.log('listening on the port', port)
})
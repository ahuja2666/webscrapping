const mongoose = require('mongoose')
const app = require('./app')

mongoose.connect(`mongodb+srv://ahuja:harshit@cluster0.hedg8ld.mongodb.net/webscrapper?retryWrites=true&w=majority`).then(() => {
    console.log('connected to mongodb')
}).catch((error) => {
    console.log(error)
})

app.listen('5000', () => {
    console.log('server is up')
})
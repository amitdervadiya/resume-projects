const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://amitdervadiya:Amit1234@node.c4vd0.mongodb.net/Adminpanel')
const database = mongoose.connection;
database.once('open', (err) => {
    err ? console.log(err) : console.log('database connected...')
})
module.exports = database
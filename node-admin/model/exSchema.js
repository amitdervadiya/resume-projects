const mongoose = require('mongoose')
const schema = mongoose.Schema({
    excategory: {
        type: String,
        required: true,
    },
    subcategoryid: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"subcategory",
        required: true,
    }
})
const excategory = mongoose.model('excategory',schema)
module.exports = excategory
const categorySchema = require('../model/categorySchema')
const fs = require('fs')
module.exports.addcat = (req, res) => {
    res.render('addcategory')
}
module.exports.addcategory = async (req, res) => {
    req.body.img = req.file.path
    console.log(req.body)
    await categorySchema.create(req.body).then(() => {
        res.redirect('/category/addcat')
    })
}
module.exports.viewcategory = async (req, res) => {
    console.log(req.body)
    await categorySchema.find({}).then((data) => {
        res.render('viewcategory', { data })
    })
}

module.exports.editcat = async (req, res) => {
    await categorySchema.findById(req.query.id).then((data) => {
        res.render('editcat', { data })
    })
}
module.exports.updatecat = async (req, res) => {
    let img = ""
    let singleData = await categorySchema.findById(req.body.id)
    req.file ? img = req.file.path : img = singleData.img
    req.file && fs.unlinkSync(singleData.img)
    req.body.img = img
    await categorySchema.findByIdAndUpdate(req.body.id, req.body).then((data) => {
        res.redirect('/category/viewcategory')
    })
}
module.exports.deletecat = async (req, res) => {
    let singleData = await categorySchema.findById(req.query.id)
    
    fs.unlinkSync(singleData.img)
    await categorySchema.findByIdAndDelete(req.query.id).then((data) => {
        console.log(data)
        res.redirect('/category/viewcategory')
    })
}
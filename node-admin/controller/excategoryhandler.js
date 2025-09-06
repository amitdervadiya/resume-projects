const exSchema = require('../model/exSchema')
const subcategorySchema = require('../model/subcategorySchema')
const categorySchema = require('../model/categorySchema')
const fs = require('fs')

module.exports.addexcat = async (req, res) => {
    let data = await subcategorySchema.find({})
    res.render('addexcategory', { data })
}


module.exports.addextracategory = async (req, res) => {
    await exSchema.create(req.body).then((data) => {
        res.redirect('/excategory/addexcat')
    })
}

module.exports.viewexcat = async (req, res) => {
    await exSchema.find({}).populate("subcategoryid").then((data) => {
        res.render('viewexcategory', { data })
    })
}
module.exports.editexcat = async (req, res) => {


    await exSchema.findById(req.query.id).populate('subcategoryid').then((data) => {
        res.render('editexcat', { data })
    })
}
module.exports.updateexcat = async (req, res) => {
    await exSchema.findByIdAndUpdate(req.body.id, req.body).populate('subcategoryid').then((data) => {
        res.redirect("/excategory/viewexcat")
    })
}
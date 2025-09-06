const exSchema = require('../model/exSchema')
const subcategorySchema = require('../model/subcategorySchema')
const categorySchema = require('../model/categorySchema')
const productSchema = require("../model/productSchema")
const fs = require('fs')


module.exports.addproduct = (req, res) => {
    res.render('addproduct')
}

module.exports.addproductin = async (req, res) => {

    req.body.img = req.file.path
 
    await productSchema.create(req.body).then(()=>{
        res.redirect('/product/addproduct')

    })
}
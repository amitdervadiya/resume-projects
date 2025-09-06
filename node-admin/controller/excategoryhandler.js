const exSchema = require('../model/exSchema')
const subcategorySchema = require('../model/subcategorySchema')
const categorySchema = require('../model/categorySchema')
const fs = require('fs')
module.exports.addexcat = async (req, res) => {
    try {
        const data = await subcategorySchema.find({});
        return res.render('addexcategory', { data });
    } catch (err) {
        console.error(err);
        return res.redirect('/excategory/addexcat');
    }
};

module.exports.addextracategory = async (req, res) => {
    try {
        await exSchema.create(req.body);
        return res.redirect('/excategory/addexcat');
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server Error");
    }
};

module.exports.viewexcat = async (req, res) => {
    try {
        const data = await exSchema.find({}).populate("subcategoryid");
        return res.render('viewexcategory', { data });
    } catch (err) {
        console.error(err);
        return res.redirect('/excategory/addexcat');
    }
};

module.exports.editexcat = async (req, res) => {
    try {
        const data = await exSchema.findById(req.query.id).populate('subcategoryid');
        return res.render('editexcat', { data });
    } catch (err) {
        console.error(err);
        return res.redirect('/excategory/viewexcat');
    }
};

module.exports.updateexcat = async (req, res) => {
    try {
        await exSchema.findByIdAndUpdate(req.body.id, req.body);
        return res.redirect('/excategory/viewexcat');
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server Error");
    }
};
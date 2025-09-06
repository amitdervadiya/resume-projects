const subcategorySchema = require('../model/subcategorySchema')
const categorySchema = require('../model/categorySchema')
const fs = require('fs')

module.exports.addsubcat = async (req, res) => {
  try {
    const data = await categorySchema.find({});
    return res.render('addsubcategory', { data });
  } catch (err) {
    console.error(err);
    return res.redirect('/subcategory/addsubcat');
  }
};

module.exports.addsubcategory = async (req, res) => {
  try {
    await subcategorySchema.create(req.body);
    return res.redirect('/subcategory/addsubcat');
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
};

module.exports.viewsubcatgory = async (req, res) => {
  try {
    const data = await subcategorySchema.find({}).populate("categoryid");
    return res.render('viewsubcatgory', { data });
  } catch (err) {
    console.error(err);
    return res.redirect('/subcategory/addsubcat');
  }
};

module.exports.editsubcat = async (req, res) => {
  try {
    const category = await categorySchema.find({});
    const data = await subcategorySchema.findById(req.query.id);
    return res.render('editsubcat', { data, category });
  } catch (err) {
    console.error(err);
    return res.redirect('/subcategory/viewsubcatgory');
  }
};

module.exports.deletesubcat = async (req, res) => {
  try {
    await subcategorySchema.findByIdAndDelete(req.query.id);
    return res.redirect('/subcategory/viewsubcatgory');
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
};

module.exports.updatesubcat = async (req, res) => {
  try {
    await subcategorySchema.findByIdAndUpdate(req.body.id, req.body);
    return res.redirect('/subcategory/viewsubcatgory');
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
};
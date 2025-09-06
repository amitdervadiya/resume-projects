const fs = require('fs');
const categorySchema = require('../model/categorySchema');
const subcategorySchema = require('../model/subcategorySchema');
const exSchema = require('../model/exSchema');

// ===================== CATEGORY =====================

module.exports.addcat = (req, res) => {
  res.render('addcategory');
};

module.exports.addcategory = async (req, res) => {
  try {
    req.body.img = req.file.path;
    console.log(req.body);
    await categorySchema.create(req.body);
    return res.redirect('/category/addcat');
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
};

module.exports.viewcategory = async (req, res) => {
  try {
    const data = await categorySchema.find({});
    return res.render('viewcategory', { data });
  } catch (err) {
    console.error(err);
    return res.redirect('/category/addcat');
  }
};

module.exports.editcat = async (req, res) => {
  try {
    const data = await categorySchema.findById(req.query.id);
    return res.render('editcat', { data });
  } catch (err) {
    console.error(err);
    return res.redirect('/category/viewcategory');
  }
};

module.exports.updatecat = async (req, res) => {
  try {
    let img = '';
    const singleData = await categorySchema.findById(req.body.id);

    if (req.file) {
      img = req.file.path;
      if (singleData.img) fs.unlinkSync(singleData.img);
    } else {
      img = singleData.img;
    }

    req.body.img = img;
    await categorySchema.findByIdAndUpdate(req.body.id, req.body);
    return res.redirect('/category/viewcategory');
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
};

module.exports.deletecat = async (req, res) => {
  try {
    const singleData = await categorySchema.findById(req.query.id);
    if (singleData.img) fs.unlinkSync(singleData.img);
    await categorySchema.findByIdAndDelete(req.query.id);
    return res.redirect('/category/viewcategory');
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
};
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/productimg')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}`)
    }
})
const productimg = multer({ storage: storage }).single('img')
module.exports = productimg
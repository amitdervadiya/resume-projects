const adminSchema = require('../model/adminSchema')
const fs = require('fs')
const nodemailer = require('../middleware/nodemailer')

module.exports.loginform = async (req, res) => {
    res.render('login')

}

module.exports.login = async (req, res) => {
    res.redirect('/dashboard');
    // let admin = await adminSchema.findOne({ email: req.body.email });
    // if (admin) {
    //     if (admin.password === req.body.password) {
    //         res.cookie('AdminData', admin); 
    //         console.log('Cookies after login:', req.cookies);

    //     } else {
    //         res.redirect('/');
    //     }
    // } else {
    //     res.redirect('/');
    // }
};

module.exports.dashboard = (req, res) => {
    res.render('index');
    // if (req.cookies && req.cookies.AdminData) {
    //     res.render('index');
    // } else {
    //     res.redirect('/');
    // }
};

module.exports.addAdmin = (req, res) => {
    res.render('addAdmin')
    // if (req.cookies.AdminData) {
    //     res.render('addAdmin')
    // }
    // else {
    //     res.redirect('/')
    // }

}
module.exports.viewAdmin = async (req, res) => {
    const adminData = await adminSchema.find({})
    res.render('viewAdmin', { adminData })
    // if (req.cookies.AdminData) {
    //     const adminData = await adminSchema.find({})
    //     res.render('viewAdmin', { adminData })

    // }
    // else {
    //     res.redirect('/')
    // }


}
module.exports.addNewAdmin = async (req, res) => {

    req.body.profile = req.file.path;
    await adminSchema.create(req.body).then((data) => {
      
        res.redirect('/addAdmin')
    })
}

module.exports.deleteAdmin = async (req, res) => {
    await adminSchema.findByIdAndDelete(req.query.id).then((data) => {
        
        res.redirect('/viewAdmin')
    })
}

module.exports.editAdmin = async (req, res) => {
    await adminSchema.findById(req.query.id).then((data) => {
        res.render('editAdmin', { data })
    })
}
module.exports.updateAdmin = async (req, res) => {
    let img = ""
    let singleData = await adminSchema.findById(req.body.id)
   

    req.file ? img = req.file.path : img = singleData.profile
    req.file && fs.unlinkSync(singleData.profile)
    req.body.profile = img
    await adminSchema.findByIdAndUpdate(req.body.id, req.body).then((data) => {
        res.redirect('/viewAdmin')
    })
}
module.exports.profile = (req, res) => {
    res.render('profile')
}
module.exports.changepassword = (req, res) => {
    res.render('password')
}
module.exports.changepass = async (req, res) => {
    let user = req.user
    console.log(user)
    if (user.password == req.body.oldpassword) {
        if (user.password !== req.body.newpassword) {
            if (req.body.newpassword == req.body.confirmpassword) {
                let admin = await adminSchema.findByIdAndUpdate(user.id, { password: req.body.newpassword })
                res.redirect('/')
            }
            else {
                console.log('new pass and confirm pass have to be same')
            }
        }
        else {
            console.log('old and new password are not have to be same')
        }
    }
    else {
        console.log('password is not matched')
    }
}

module.exports.forgotpass = async (req, res) => {
    // res.render("recoverpass")
    let admin = await adminSchema.findOne({ email: req.body.email })
    if (!admin) {
        res.redirect('/')
    }

    else {
        let otp = Math.floor((Math.random() * 1000) + (Math.random() * 1000) + 1000)
        let email = req.body.email
        nodemailer.sendotp(email, otp)
        console.log(otp)
        req.session.otp = otp
        req.session.admindata = admin
        res.render("recoverpass")
    }
}

module.exports.recoverypass = async (req, res) => {
    let otp = req.session.otp
    let admin = req.session.admindata


    console.log(otp + " " + "get it")

    
    if (otp == req.body.otp) {
        if (req.body.newpassword == req.body.confirmpassword) {
            await adminSchema.findByIdAndUpdate(admin._id, { password: req.body.newpassword })
            console.log("password changed")
            res.redirect('/')
        }
        else {
            console.log('new pass and confirm pass have to be same')
        }
    }
    else {
        console.log('password is not matched')
    }
}
module.exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect('/');
};


const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: 'gmail',
    auth: {
        user: 'amitdervadiya@gmail.com',
        pass: "khcupljjyiqqppns"
    }
})

module.exports.sendotp = (to, otp) => {
    let mailOptions = {
        from: 'amitdervadiya@gmail.com',
        to: to,
        subject: 'OTP',
        text: `your otp is ${otp}`
    }
    transporter.sendMail(mailOptions, (err) => {
        err ? console.log(err) : console.log('otp send to your email')
    })
}


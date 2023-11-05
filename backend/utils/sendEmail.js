const nodemailer = require("nodemailer")

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        service: "gmail",
        auth: {
            // type:"OAuth2",
            // user: "abhishek.ay050103@gmail.com",
            pass: "Abhi@8310"
        }
    })
    const mailOptions = {
        from: "abhishek.ay050103@gmail.com",
        to: options.email,
        subject: options.subject,
        text: options.message
    }
    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail
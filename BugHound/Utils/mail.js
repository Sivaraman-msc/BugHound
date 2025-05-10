const nodemailer=require('nodemailer')
require('dotenv').config()

const transporter=nodemailer.createTransport({
    secure:true,
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
})

exports.MailResponse = async (to, sub, msg) => {
    try {
        const info = await transporter.sendMail({
            to,
            subject: sub,
            html: msg,
        });
        console.log("Mail sent:", info.response);
    } catch (err) {
        console.error("Mail sending failed:", err); 
        throw err; 
    }
};

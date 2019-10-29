const nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'duc200397@gmail.com',
        pass: 'banbe1234'
    }
})

var mailOptions = {
    from: 'luongcaoduc2003@gmail.com',
    to: ``,
    subject: 'Sending Email using Node.js',
    text: ``
};

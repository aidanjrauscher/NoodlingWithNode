const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");

const sendEmailEthereal = async (req, res) => {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: process.env.DEV_EMAIL_HOST,
    port: 587,
    auth: {
      user: process.env.DEV_EMAIL_USERNAME,
      pass: process.env.DEV_EMAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: "Noodling With Node <kevon11@ethereal.email>",
    to: "bar@email.com",
    subject: "Noodling With Node Send Email",
    html: "<h2>Email sent wih node!</h2>",
  });

  res.status(200);
  res.json(info);
};

// const sendEmail = async (req, res) => {
//   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//   const msg = {
//     to: "ajrscomputer@gmail.com", // Change to your recipient
//     from: "Aidan Rauscher <aidanrauscher23@gmail.com>", // Change to your verified sender
//     subject: "Noodling with Node",
//     html: "<h2>Sent with Node.js.</h2>",
//   };
//   const info = await sgMail.send(msg);
//   res.json(info);
// };

module.exports = sendEmailEthereal;

const nodemailer = require("nodemailer");
const senderMail = "azhark3113@gmail.com";
module.exports = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "jasper.gutmann@ethereal.email",
        pass: "nDcPM3fT9buPsgNhN9",
      },
    });
    let info = await transporter.sendMail({
      from: senderMail, // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    console.log("Email Send Successfully", info);
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

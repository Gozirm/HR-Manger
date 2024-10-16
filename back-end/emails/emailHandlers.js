import { createTransport } from "nodemailer";
import { createWelcomeEmailTemplate } from "./emailTemplates.js";

export const sendWelcomeEmail = (options) => {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.to,
    subject: "Welcome to Hr-Manager",
    html: createWelcomeEmailTemplate(options.firstName, options.clientUrl),
    category: "welcome",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

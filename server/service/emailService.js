import nodemailer from "nodemailer"
import * as dotenv from "dotenv";
dotenv.config();

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "bestsudokusolver@gmail.com",
      pass: process.env.GMAIL_PASS,
    },
  });

export const sendMail = async (email,title,body) => {
    let mailOptions = {
        from: "bestsudokusolver@gmail.com",
        to: email,
        subject: title,
        text: body,
      };

    return new Promise( (resolve, reject) => {
            transporter.sendMail(mailOptions, (error) => {
                if (error) {
                  console.log(error)
                  reject(false)
                } else {
                  resolve(true)
                }
        })
      });
}

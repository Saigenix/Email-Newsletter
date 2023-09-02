"use strict";

require("dotenv").config();
const nodemailer = require("nodemailer");
const showdown = require("showdown");
const fs = require("fs");
const  emails = require("./emails");

var EmailList = undefined;
var htm = undefined;

const HtmlToMark = (content) => {
  const converter = new showdown.Converter();
  const text = content;
  let html = converter.makeHtml(text);
  //   console.log(html);
  return html;
};

const SendLastFile = async () => {
  fs.readdir("./content", (err, files) => {
    if (err) {
      console.error(err);
      s(undefined);
    }
    fs.readFile(`./content/${files[files.length - 1]}`, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        s(undefined);
      }
      // console.log(data);
      let html = HtmlToMark(data);
      // DATAREADY = true;
      // console.log(html)
      s(html);
    });
  });
  //   FileName = GetLastFile();
  //   console.log("sai"+FileName);

  //   function func(d){
  //     htm = d
  //     console.log("s"+htm)
  //   }
  //   return htm
  //
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    type: "login", // default
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});
// saigenix@opemic.com

async function main(data) {
  console.log("Sending Mail...");
  EmailList = await emails.getData()
  console.log(EmailList)
  EmailList.forEach(async (val) => {
    const info = await transporter.sendMail({
      from: "Saigenix", // sender address
      to: val.email, // list of receivers
      subject: `Hello ${val.name}!`, // plain text body
      html: data, // html body
    });

    console.log(`Message sent: ${info.messageId}`);
  });

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}
const s = async (data) => {
  // console.log("data:"+ await SendLastFile())
  // console.log(data)
  if (data != undefined) main(data).catch(console.error);
};
SendLastFile();

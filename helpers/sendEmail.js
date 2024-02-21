import nodemailer from "nodemailer";
// import dotenv from 'dotenv';
// dotenv.config();

const { META_PASSWORD, EMAIL } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL,
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: EMAIL };
  await transport.sendMail(email);
  return true;
};
export default sendEmail;

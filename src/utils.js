import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import jwt from "jsonwebtoken";
export const generateSecret = () => {
  const arrLen = adjectives.length;
  const randomNumber = Math.floor(Math.random() * arrLen);
  console.log(randomNumber);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "insta@gram.com",
    to: address,
    subject: "Login Secret for PrismaGram",
    html: `Hello! Your login Secret is <strong>${secret}</strong>.<hr/> Please Copy and Paste it on the web/app site`
  };
  return sendMail(email);
};

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);

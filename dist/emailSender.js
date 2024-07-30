"use strict";
var sdMail = require("@sendgrid/mail");
var dotenv = require("dotenv");
dotenv.config();
sdMail.setApiKey(process.env.EMAIL_API_KEY);
exports.sendWelcomeMail = function () {
    var msg = {
        to: "21cs002@charusat.edu.com",
        from: "bhavya.bhagat@talentsystems.com", // Use the email address or domain you verified above
        subject: "Sending with Twilio SendGrid is Fun",
        text: "and easy to do anywhere, even with Node.js",
        // html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };
    //     sdMail.send(msg).then
};

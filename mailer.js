/**
 * Created by ionut.aruxandei on 10/06/16.
 */
var app = require('express')();
var express = require('express')
var http = require('http').Server(app);
var nodemailer = require('nodemailer');
var io = require('socket.io')(http);
var swig = require('swig');

var sendConfirmationMail = function(userData, type) {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        host : "smtp.gmail.com",
        secureConnection : false,
        port : 587,
        auth : {
            user : "arux.ionut@gmail.com", // add your own
            pass : "" // add your own
        }
    });

// setup e-mail data with unicode symbols
    var mailOptions = generateMailOption(userData, type);

// send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}


var generateMailOption = function(userData, type) {
    switch (type) {
        case "registration" :
            var updatedHtml = appendHtml('./email-templates/registrationConfirmation.html', userData.userName);
            console.log("typeof: ", typeof updatedHtml);
            return {
                from: '"Ionut Aruxandei" <arux.ionut@gmail.com>', // sender address
                to: userData.email, // list of receivers
                subject: 'Welcome!', // Subject line
                // text: 'NA NA NA NA NAAAAAA NAAAA', // plaintext body
                html: updatedHtml.replace("\n","") // html body
            }
            break;
        case "changePassword" :
            var updatedHtml = appendHtml('./email-templates/changePassword.html', userData.userName, userData.email, userData.password);
            return {
                from: '"Ionut Aruxandei" <arux.ionut@gmail.com>', // sender address
                to: userData.email, // list of receivers
                subject: 'Welcome!', // Subject line
                // text: 'NA NA NA NA NAAAAAA NAAAA', // plaintext body
                html: updatedHtml // html body
            }
            break;
        case "userUpdate" :
            var updatedHtml = appendHtml('./email-templates/updatedUser.html', userData.userName, userData.email);
            console.log("user: ", userData.userName);
            console.log("email: ", userData.email);

            return {
                from: '"Ionut Aruxandei" <arux.ionut@gmail.com>', // sender address
                to: userData.email, // list of receivers
                subject: 'Your Information Has Been Changed!', // Subject line
                // text: 'NA NA NA NA NAAAAAA NAAAA', // plaintext body
                html: updatedHtml // html body
            }
        default:
            break;
    }
}

var appendHtml = function(template, userName, email, password) {
    return swig.renderFile(template, {
        pagename: 'email',
        userName : userName,
        email : email,
        password : password
    });

}

module.exports = sendConfirmationMail;
const nodemailer = require('nodemailer');

module.exports = {mail, invite}

function mail(mailOptions){

  mailOptions.replyTo = 'giftlist.app@fraser.page'
  mailOptions.from = 'giftlist.app@fraser.page'

  const transporter = nodemailer.createTransport({
    service: 'sendgrid',
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY
    }
  })

  console.log(mailOptions)

  transporter.sendMail(mailOptions, function(err, res) {
    if (err) {
      console.error('there was an error: ', err);
    } else {
      console.log('here is the res: ', res)
    }
  })
}

function invite(group, invite, reqUser, reqBody){
  const mailOptions = {
    to: invite.email,
    subject: `${reqUser.name} is inviting you to join a gift exchange`,
    html: `<h1>Join ${reqUser.name} on Gift List App</h1>
    <p>Gift List App helps you coordinate gift giving. View the people in your groups gift list, claim a gift and create your own gift list.</p>
    <hr>
    <p>${reqUser.firstName} added a message: ${reqBody.message}</p>
    <a href="http://localhost:3000/groups/${group._id}/invite/${invite._id}">Accept ${reqUser.firstName}'s invitation to join the gift group: ${reqBody.name}</a>
    `
  }
  mail(mailOptions)
}
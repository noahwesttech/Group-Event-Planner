// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const sendInviteEmails = async (
  eventEmails,
  eventTitle,
  eventDate,
  eventLocation,
  newEventId
) => {
  let port;

  if (process.env.JAWSDB_URL) {
    port = "https://lumivent.herokuapp.com/";
  } else {
    port = "http://localhost:3001";
  }

  if (eventEmails.length) {
    for (let i = 0; i < eventEmails.length; i++) {
      const msg = {
        to: eventEmails[i],
        from: "mike.lumivent@gmail.com",
        subject: eventTitle,
        text: `You've been invited to an event at ${eventLocation} on ${eventDate}.  Please click this link to let us know your availability.  ${port}/api/event/${newEventId}`,
      };
      sgMail
        .send(msg)
        .then(() => {
          console.log("Email sent to " + eventEmails[i]);
        })
        .catch((error) => {
          console.log(
            "There was an error sending to " + eventEmails[i]
          );
          console.error(error);
        });
    }
  }
};

module.exports = {
  sendInviteEmails,
};

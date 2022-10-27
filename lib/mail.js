var mail = require("nodemailer");
var transporter = mail.createTransport({
  host: "109.237.212.180",
  auth: {
    user: "revision@verycrunchy.dev",
    pass: "?veryGrey!mail",
  },
  tls: { rejectUnauthorized: false },
});

class MailFailed extends Error {
  constructor(msg) {
    super(msg);
    this.name = "MailFailed";
  }
}

const sendMessage = async (reciever, subject, text) => {
  var mailOptions = {
    from: "revision@verycrunchy.dev",
    to: reciever,
    subject: subject,
    text: text,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    // TODO: :}
    if (error) {
      throw new MailFailed(error.message);
    }

    return "MailSuccess";
  });
};

// try {
//   sendMessage("someone@example.com", "pain", "more pain");
// } catch (e) {
//   if (e.name == "MailFailed") {
//     // Do something else
//   }
// }

export { sendMessage };

const { PrismaClient } = require("../../generated/prisma");
const sgEmail = require("@sendgrid/mail");
const { loginSendEmail, registerSendEmail } = require("../utils/templates");

const prisma = new PrismaClient();
sgEmail.setApiKey(process.env.SENDGRID_API_KEY);

const loginEmail = async (email) => {
  try {
    const emailUser = await prisma.user.findUnique({ where: { email } });
    const emailContent = {
      to: emailUser.email,
      from: "sextafeirus@gmail.com",
      subject: "Sending an email using SendGrid",
      html: loginSendEmail,
    };

    sgEmail
      .send(emailContent)
      .then(() => {
        console.log("Email sent successfully");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  } catch (error) {
    console.error(error);
  }
};

const registerEmail = async (email) => {
  try {
    const emailUser = await prisma.user.findUnique({ where: { email } });
    const emailContent = {
      to: emailUser.email,
      from: "sextafeirus@gmail.com",
      subject: "Bem-vindo a DigitalCook! ❤️",
      html: registerSendEmail,
    };
    sgEmail
      .send(emailContent)
      .then(() => {
        console.log("Email sent successfully");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { loginEmail, registerEmail };

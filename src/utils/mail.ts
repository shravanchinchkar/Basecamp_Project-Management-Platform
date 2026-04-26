import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options: any) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://taskmanagerlink.com",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);

  const emailHTML = mailGenerator.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: Number(process.env.MAILTRAP_SMTP_PORT),
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mail = {
    from: "shravanchinchkar@gmail.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHTML,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error(
      "Email service failed siliently, Make sure you have provided MAILTRAP credentials in the .env file",
    );
    console.error("Error:", error);
  }
};

const emailVerificationMailGenContent = (
  username: string,
  verificationURL: string,
) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our App! we'are exicted to have you onboard",
      action: {
        instructions:
          "To verify your email please click on the following button",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Verify your email",
          link: verificationURL,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we\'d love to help",
    },
  };
};

const forgotPasswordMailGenContent = (
  username: string,
  passwordResetURL: string,
) => {
  return {
    body: {
      name: username,
      intro: "We got a request to reset the password of your account",
      action: {
        instructions:
          "To reset your password click on the following button or link",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Verify your email",
          link: passwordResetURL,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we\'d love to help",
    },
  };
};

export {
  emailVerificationMailGenContent,
  forgotPasswordMailGenContent,
  sendEmail,
};

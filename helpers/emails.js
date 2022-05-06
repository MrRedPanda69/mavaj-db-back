import nodemailer from 'nodemailer';

export const emailRegistration = async (data) => {
    const { email, userName, token } = data;

    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "b767e5769f3529",
            pass: "a397076cece20d"
        }
    });

    // Email info
    const info = await transport.sendMail({
        from: '"AduanaProj - Shipping Services" <accounts@aduana-proj.com>',
        to: email,
        subject: 'AduanaProj - Confirm your account',
        text: 'Please confirm your AduanaProj account',
        html: `<p>Hi ${userName}! Please make sure to confirm your account</p>
        <p>Your account is almost ready, you only need to confirm it in the next link:</p>
        <a href='${process.env.FRONTEND_URL}/confirm-account/${token}'>Confirm Account</a>
        <p>If you didn't create this account, please ignore this message</p>
        `
    })
}
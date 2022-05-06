import nodemailer from 'nodemailer';

export const emailRegistration = async (data) => {
    const { email, userName, token } = data;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PWD
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
        <a href='${process.env.FRONTEND_URL}/confirm/${token}'>Confirm Account</a>
        <p>If you didn't create this account, please ignore this message</p>
        `
    })
}

export const emailForgottenPassword = async (data) => {
    const { email, userName, token } = data;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PWD
        }
    });

    // Email info
    const info = await transport.sendMail({
        from: '"AduanaProj - Shipping Services" <accounts@aduana-proj.com>',
        to: email,
        subject: 'AduanaProj - Restablish your password',
        text: 'Restablish your password',
        html: `<p>Hi ${userName}! We are sending you the instructions to restablish your password</p>
        <p>Click on the next link to create a new password:</p>
        <a href='${process.env.FRONTEND_URL}/forgotten-password/${token}'>Restablish password</a>
        <p>If you didn't ask this email, please ignore this message</p>
        `
    })
}
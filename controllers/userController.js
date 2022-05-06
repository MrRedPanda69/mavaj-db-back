import User from '../models/User.js';
import generateId from '../helpers/generateId.js';
import generateJWT from '../helpers/generateJWT.js';
import { emailRegistration, emailForgottenPassword } from '../helpers/emails.js';

const register = async (req, res) => {
    // Prevent duplicated entries
    const { email } = req.body;
    const userExists = await User.findOne({email});

    if(userExists) {
        const error = new Error('User already exists');
        return res.status(400).json({msg: error.message});
    }

    try {
        const user = new User(req.body);
        user.token = generateId();
        await user.save();

        // Send confirmation email
        emailRegistration({
            email: user.email,
            userName: user.userName,
            token: user.token
        })

        res.json({msg: 'User Successfully Created, check your email to confirm your account'});

    } catch (error) {
        console.log(error);
    }
}

const authenticate = async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({email});
    if(!user) {
        const error = new Error('User does not exist');
        return res.status(404).json({msg: error.message});
    }

    // Check if user is confirmed
    if(!user.confirmed) {
        const error = new Error('You need to confirm your account');
        return res.status(403).json({msg: error.message});
    }

    // Check password 
    if(await user.confirmPassword(password)) {
        res.json({
            _id: user._id,
            userName: user.userName,
            email: user.email,
            token: generateJWT(user._id)
        })

    } else {
        const error = new Error('Your password is incorrect, try again');
        return res.status(403).json({msg: error.message});
    }
}

const confirm = async (req, res) => {
    const { token } = req.params;
    const userConfirm = await User.findOne({token});

    if(!userConfirm) {
        const error = new Error('Invalid Token');
        return res.status(403).json({msg: error.message});
    }

    try {
        userConfirm.confirmed = true;
        userConfirm.token = '';
        await userConfirm.save();
        res.json({msg: 'User successfully confirmed'});
        
    } catch (error) {
        console.log(error);
    }
}

const forgottenPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({email});

    if(!user) {
        const error = new Error('User does not exist');
        return res.status(404).json({msg: error.message});
    }

    try {
        user.token = generateId();
        await user.save();

        // Send email
        emailForgottenPassword({
            email: user.email,
            userName: user.userName,
            token: user.token
        });

        res.json({msg: 'We sent an email with instructions on how to change your password'})

    } catch (error) {
        console.log(error);
    }
}

const confirmToken = async (req, res) => {
    const { token } = req.params;
    const validToken = await User.findOne({token});

    if(validToken) {
        res.json({msg: 'Token is valid, and user exists'});
    } else {
        const error = new Error('Unvalid Token');
        return res.status(404).json({ msg: error.message });
    }
}

const newPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({token});

    if(user) {
        user.password = password;
        user.token = '';

        try {
            await user.save();
            res.json({msg: 'Password successfully modified'});

        } catch (error) {
            console.log(error);
        }
    } else {
        const error = new Error('Unvalid Token');
        return res.status(404).json({ msg: error.message });
    }
}

const profile = async (req, res) => {
    const {user} = req;

    res.json(user);
}

export { authenticate, register, confirm, forgottenPassword, confirmToken, newPassword, profile };
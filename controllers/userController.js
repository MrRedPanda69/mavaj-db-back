import User from '../models/User.js';
import generateId from '../helpers/generateId.js';

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
        const storedUser = await user.save();

        res.json(storedUser);

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
        const error = new Error('You need to confirm their account');
        return res.status(404).json({msg: error.message});
    }

    // Check password 
    if(await user.confirmPassword(password)) {

    } else {
        const error = new Error('Your password does not match, try again');
        return res.status(404).json({msg: error.message});
    }

}

export { authenticate ,register };
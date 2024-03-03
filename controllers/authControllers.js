const {hashPassword,comparePassword} = require('../helpers/hashing')
const {generateJwtToken,verifyJwtToken}= require('../helpers/jsonWebToken')
const User = require('../models/schemas/userSchema')
// const {sendMailRegister} = require('../helpers/nodemailer')





exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        delete user.password;
        // console.log(user);
        if (user) {
             const checked = await comparePassword(password, user.password);

             if (checked) {
                //Password is correct, proceed with login
                // console.log(user)
                const token = await generateJwtToken(user)
                res.cookie('tokenauth', token)
                console.log(token)
                res.status(200).send('You are logged in successfully');

             } else {
                // Password is incorrect
             res.status(401).send('Incorrect password');
             }
        } else {
            // User not found
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal server error');
    }
};







exports.registerUser = async (req, res) => {
    try {
        // Extract data from request
        const { filename } = req.file;
        const { username, email, password, gender, age, country, phoneNumber } = req.body;

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create a new user object
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            gender,
            age,
            country,
            phoneNumber,
            filename
        });

        // Save the new user to the database
        const result = await newUser.save();

        // Respond with JSON containing the saved user data
        res.json({
            data: result
        });
    } catch (error) {
        // Handle errors
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
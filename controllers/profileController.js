const User = require('../models/schemas/userSchema'); 
const {hashPassword,comparePassword} = require('../helpers/hashing')

exports.getCurrentProfile = async (req, res) => {
    try {
        // Retrieve user ID from the request parameters
        const id = req.user._id
        const user = await User.findById(id);
        // Check if user is found
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Send the user object as the response
        res.json({
            data: user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateCurrentProfile = async (req,res) => {
    try {
        // Retrieve user ID from the request parameters
        const id = req.user._id
        // Retrieve filename from the request file
        const {filename} = req.file
        // Retrieve User informations from the request body
        const { username, email, password, gender, age, country, phoneNumber } = req.body;
        const userfound = await User.findById(id)
        console.log(userfound)
        // Hash the password
        const checked =  await comparePassword(password, userfound.password)
        console.log(checked)
        if (checked) {
            return res.status(404).json({ message: 'u can change ur password with ancient pass' });
        }else{
        const hashedPassword = await hashPassword(password)
        //update the current profile
        const user = await User.updateOne({_id : id},{ username,
             email, 
             password : hashedPassword, 
             gender, 
             age, 
             country, 
             phoneNumber,
             filename });
        res.json({
            data: user
        });
    }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


exports.deleteCurrentProfile = async (req,res) => {
    try {

        const id= req.user._id
        const  deletedUser = await  User.deleteOne({_id : id})
        res.json({
            data: deletedUser
        });
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
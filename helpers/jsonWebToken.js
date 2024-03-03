const jwt = require('jsonwebtoken');

exports.generateJwtToken = (data) => {
    // console.log(process.env.SECRET_Key)
    return jwt.sign(data.toJSON(), process.env.SECRET_Key, { expiresIn: '2h' });
};

exports.verifyJwtToken = (token) => {
    return jwt.verify(token, process.env.SECRET_Key);
};

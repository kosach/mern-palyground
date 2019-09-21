const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('./User.model');

const getUserById = async (userId) => {
    const user = await User.findById(userId).select('-password')
    return user;
}
const createNewUser = async (userData) => {
    const { name, email, password } = userData;
    let user = await User.findOne({ email })
    if (user) throw 'User already exists';
    user = new User({
        name,
        email,
        password
    });
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    await user.save();
    const payload = {
        user: {
            id: user.id
        }
    }
    const token =  await jwt.sign(payload, config.get('jwtToken'))
    return token
}
const authenticateUser = async (userData) => {
    const { email, password } = userData;
    const user = await User.findOne({ email });

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) throw 'Invalid credentials';
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    await user.save();
    const payload = {
        user: {
            id: user.id
        }
    }
    const token =  await jwt.sign(payload, config.get('jwtToken'))
    return token
}


module.exports = {
    getUserById,
    createNewUser,
    authenticateUser
}
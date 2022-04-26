require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const handleLogin = async(req, res) =>{
    const {usrnm , pwd } = req.body;
    if(!usrnm || !pwd) return res.status(400).json({'message': 'Username and Passowrd missing'});
    const foundUser = await User.findOne({username: usrnm}).exec();
    if (!foundUser) return res.sendStatus(401);
    const foundPass = foundUser.password;
    const match = await bcrypt.compare(pwd, foundPass);
    if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean);
        const accessToken = jwt.sign(
            {
                "UserInfo":{
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '70s'}
        );
        const refreshToken = jwt.sign(
            {'username': foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        res.cookie('jwt', refreshToken, {httpOnly: true, secure:true, sameSite:'None', maxAge: 24*60*60*1000});
        res.json({accessToken, roles, foundPass});

    } else{
        res.sendStatus(401);
    }
}

module.exports = {handleLogin};
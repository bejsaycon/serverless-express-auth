const User = require('../models/User');
const bcrypt = require('bcrypt');

const handleNewUser = async(req, res) =>{
    const {usrnm, pwd} = req.body;
    if (!usrnm || !pwd) return res.status(400).json({'message': 'Username and Password Required'});
    const duplicate = await User.findOne({username: usrnm}).exec();
    if (duplicate) return res.sendStatus(409);
    try {
        const hashedPassword = await bcrypt.hash(pwd, 10);
        const result = await User.create({
            'username' : usrnm,
            'password' : hashedPassword
        });
        res.status(201).json({'success': `User ${usrnm} Created!`});
    } catch (error) {
        res.status(500).json({'message': error.message});
    }
};

module.exports = {handleNewUser};
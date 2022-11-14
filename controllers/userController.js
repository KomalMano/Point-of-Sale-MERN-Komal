const userModal = require('../models/userModel');

// login items
const loginController = async (req, res) => {
    try {
        const {userId, password} = req.body
        const user = await userModal.findOne({ userId, password, verified:false });
        if(user){
            res.status(200).send(user);
        }else{
            res.json({
                message:'Login Fail',
                user,
            });
        }
    } catch (error) {
        console.log(error);
    }
};

// register items
const registerController = async (req, res) => {
    try {
        const newUser = new userModal({...req.body, verified: true})
        await newUser.save()
        res.status(201).send('New User Added Succesfully')
    }catch ( error ) {
        res.status(400).send('error',error)
        console.log(error)
    }
}

module.exports = { loginController, registerController };
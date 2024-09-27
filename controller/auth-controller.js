const User = require('../models/auth-model')
const bcrypt = require('bcrypt')
const signup = async (req, res) => {
    const {username,email,password}=req.body;

    const isuser= await User.findOne({email},"username");
    console.log(isuser)
    if(isuser){
        return res.status(400).json("this user is already exists")
    }
    try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = await User.create({username,email, password:hashedPassword})
            res.status(200).json({
                message: "Signup done",
                username: user.username,
            })

      
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
const login = async (req, res) => {
    const {email,password}=req.body;

    const isuser= await User.findOne({email});
    if(!isuser){
        return res.status(404).json({message:"E-mail or password is wrong"})
    }
    const ismatch =await bcrypt.compare(password,isuser.password)
    if(!ismatch){
        return res.status(404).json({message:"E-mail or password is wrong"})
    }
    try {

        res.status(200).json({message:"Login done ",
            username:isuser.username,
            _id:isuser._id
        })
            

        
      
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


module.exports = {
    signup,
    login
}
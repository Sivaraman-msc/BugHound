const User = require('../Model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { MailResponse } = require('../Utils/mail')

require('dotenv').config()

exports.Register = async (req, res) => {
    try {
    const { name, email, password, role } = req.body
    const profile=req.file?.path

    if(!name || !email || !password || !role )
        res.status(400).json({message:"All fields are required"})

    if(!profile)
        return res.status(400).json({Message:"Image is required"})

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "user Already exists" })
        }

        const user = await User.create({ name, email, password, role, profile })
        const message = `Hello ${name} <br> You have successfully joined our platform by registering your details on our website. `

        await MailResponse(email, `Welcome ${name}`, message)
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_KEY, { expiresIn: '30d' })

        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });

        res.status(201).json({ user, token })
    } catch (err) {

        console.log("Registration Error : ", err)
        res.status(500).json({ message: 'registration error' })

    }
}

exports.UpdateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = { ...req.body };

        if (req.file) {
            updatedData.profile = req.file.path;
        }

        if (updatedData.password) {
            const salt = await bcrypt.genSalt(10);
            updatedData.password = await bcrypt.hash(updatedData.password, salt);
        }

        const user = await User.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", data: user });

    } catch (err) {
        console.log('Updating error : ', err);
        res.status(500).json({ message: "Updating error" });
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Password incorrect" })
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_KEY, { expiresIn: '30d' })
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });

        res.status(200).json({ message: "Login successfull", user, token })

    } catch (err) {
        console.log("login Error : ", err)

        res.status(500).json({ message: "Login Error" })

    }
}

exports.GetAllUsers = async (req, res) => {
    try {
      const users = await User.find({}, 'name email role profile'); 
      return res.status(200).json(users);
    } catch (err) {
      console.error("GetAllUsers Error:", err);
      return res.status(500).json({ message: "Failed to retrieve users", error: err.message });
    }
  };

exports.GetUserById=async(req,res)=>{
    try{
        const userId=req.params.id
        const user=await User.findById(userId)

        if(!user){
            res.status(404).json({message:"user not exists"})
        }
        res.status(200).json({message:"User retrieved ",data : user})
    } catch(err){
        console.log(err)
        res.status(500).json({message:"User retrieving error"})
    }
}
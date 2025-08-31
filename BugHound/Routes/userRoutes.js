const express=require('express')
const { Register, login, UpdateUser, GetAllUsers, GetUserById } = require('../Controller/authController')
const { ValidateUser, LoginValidate, ValidateUpdateUser } = require('../Middleware/validation')
const { validateResult } = require('../Controller/validator')
const { AuthorizeRole } = require('../Middleware/authorizeRole')
const { Auth } = require('../Middleware/auth')
const { uploadImage } = require('../Upload/multer')
const router=express.Router()

router.post('/signup',uploadImage.single('profile') ,ValidateUser,validateResult,Register)
router.post('/login',LoginValidate,validateResult,login)
router.put('/updateUser/:id', uploadImage.single('profile'), ValidateUpdateUser, validateResult, UpdateUser);
router.get('/getUsers',Auth ,AuthorizeRole('Tester','ProjectManager'),GetAllUsers)
router.get('/getuserbyid/:id',Auth,AuthorizeRole('ProjectManager'),GetUserById)

module.exports=router 
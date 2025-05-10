const express=require('express')
const { CreateComment, GetComment, DeleteComment, GetCommentById } = require('../Controller/commentController')
const { Auth } = require('../Middleware/auth')
const { AuthorizeRole } = require('../Middleware/authorizeRole')
const { CommentValidation } = require('../Middleware/validation')
const { uploadImage } = require('../Upload/multer')
const router=express.Router()

router.post('/createComment',Auth, uploadImage.none(),AuthorizeRole('ProjectManager'),CommentValidation , CreateComment)
router.get('/getComment',Auth,GetComment)
router.get('/getCommentbyid/:id',Auth,AuthorizeRole('projectManager'),GetCommentById)
router.delete('/deleteComment/:id',Auth,AuthorizeRole('ProjectManager'),DeleteComment)

module.exports=router 
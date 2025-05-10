const {body}=require('express-validator')

exports.ValidateUser=[
    body('name').notEmpty().withMessage("Name is required"),
    body('email').isEmail().withMessage("Email is not valid"),
    body('password').isLength({min:8}).withMessage("Password must be 8 char"),
    body('role').isIn(["Tester", "Developer", "ProjectManager"]).withMessage("Invalid status")
]
exports.LoginValidate=[
    body('email').isEmail().withMessage("Email is not valid"),
    body('password').isLength({min:8}).withMessage("Password must be 8 char")
]
exports.ValidateUpdateUser = [
    body('name').optional().isString().withMessage('Name must be a string'),
    body('email').optional().isEmail().withMessage('Email must be valid'),
    body('password').optional().isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('role').optional().isIn(['Tester', 'Developer', 'ProjectManager']).withMessage('Invalid role')
]
exports.BugValidation = [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("status").isIn(["open", "in-progress", "closed"]).withMessage("Invalid status"),
    body("priority").isIn(["low", "medium", "high", "critical"]).withMessage("Invalid priority"),
    body("assignedTo").notEmpty().withMessage("assignedTo is required"),
  ];

exports.BugUpdateValidation = [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("status").isIn(["open", "in-progress", "closed"]).withMessage("Invalid status"),
    body("priority").isIn(["low", "medium", "high", "critical"]).withMessage("Invalid priority"),
    body("assignedTo").notEmpty().withMessage("assignedTo is required"),
  ];

exports.CommentValidation=[
    body('bug').notEmpty().withMessage("Bug id is required"),
    body('user').notEmpty().withMessage("Person required"),
    body('content').notEmpty().withMessage("Content is required")
]
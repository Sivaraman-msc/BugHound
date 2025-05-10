const express = require("express");
const { CreateBug, GetBug, UpdateBug, GetBugById, BugStatus, BugCondition } = require("../Controller/BugController");
const { uploadImage } = require("../Upload/multer");
const { Auth } = require("../Middleware/auth");
const { AuthorizeRole } = require("../Middleware/authorizeRole");
const { BugValidation, BugUpdateValidation } = require("../Middleware/validation");
const { validateResult } = require("../Controller/validator");

const router = express.Router();

router.post("/create", Auth, AuthorizeRole("Tester"), uploadImage.single("screenshot"), BugValidation, validateResult, CreateBug);
router.get("/getbug", Auth, AuthorizeRole("ProjectManager","Developer"), GetBug);
router.patch("/updatebug/:id", Auth, AuthorizeRole("Developer"), uploadImage.single("screenshot"),BugUpdateValidation , UpdateBug);
router.get("/getbugbyid/:id",Auth,AuthorizeRole("ProjectManager","Developer"),GetBugById)
router.get('/bugStat',Auth,BugStatus)
router.get('/bugCondition',Auth,BugCondition)

module.exports = router;
 
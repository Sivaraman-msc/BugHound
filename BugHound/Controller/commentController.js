const Bug = require("../Model/bug")
const Comment = require("../Model/comment")
const User = require("../Model/user")
const { MailResponse } = require("../Utils/mail")

exports.CreateComment = async (req, res) => {
    try {
        console.log("Body received:", req.body);

        const { bugId, to, content } = req.body;

        if (!bugId || !to || !content) {
            return res.status(400).json({ message: "bugId, to, and content are required." });
        }

        const bug = await Bug.findById(bugId);
        if (!bug) {
            return res.status(404).json({ message: "Bug not found." });
        }

        const comment = new Comment({
            bug: bugId,
            user: req.user.id,
            content
        });

        const toDeveloper = await User.findById(to);
        if (toDeveloper && toDeveloper.email) {
            const message = `
                <p><strong>Bug Id:</strong> ${bugId}</p>
                <p><strong>To:</strong> ${toDeveloper.name}</p>
                <p><strong>Content:</strong> ${content}</p>`;

            await MailResponse(toDeveloper.email, "New comment", message);
        }

        await comment.save();
        res.status(200).json({ message: "Commented", NewComment: comment });

    } catch (err) {
        console.log("CreateComment Error:", err);
        res.status(500).json({ message: "Error", err });
    }
};

exports.GetCommentById = async (req, res) => {
    try {
        const id = req.params.id
        const GetComment = await Comment.findById(id)

        if (!GetComment) {
            res.status(404).json({ message: "Comment Not found" })
        }
        res.status(200).json({ message: "Comment retrieved ", data: GetComment })
    } catch (err) {
        res.status(500).json({ message: "Error", err })
    }
}


exports.GetComment = async (req, res) => {
    try {
        const comment = await Comment.find()
            .populate('bug', 'title')
            .populate('user', 'name');
        res.status(200).json({ message: comment })
    } catch (err) {
        res.status(500).json({ message: err })
    }
}

exports.DeleteComment = async (req, res) => {
    try {
        const { id } = req.params
        const deleteComment = await Comment.findByIdAndDelete(id)
        res.status(200).json({ message: "Deleted successfully", deleteComment })
    } catch (err) {
        res.status(500).json({ message: err })
    }
}
const Bug = require("../Model/bug");
const User = require("../Model/user");
const { MailResponse } = require("../Utils/mail");

exports.CreateBug = async (req, res) => {
  try {
    console.log("REQ.USER:", req.user);    
    console.log("REQ.BODY:", req.body);        
    console.log("REQ.FILE:", req.file);        

    const { title, description, status, priority, assignedTo } = req.body;

    if (!title || !description || !status || !priority || !assignedTo) {
      return res.status(400).json({ message: "All fields except 'screenshot' are required" });
    }

    const screenshot = req.file?.path || null;
    if (!screenshot) {
      return res.status(400).json({ message: "Screenshot image is required" });
    }

    const newBug = new Bug({
      title,
      description,
      status,
      priority,
      reportedBy: req.user.id,   
      assignedTo,
      screenshot,
    });

    const assignedUser = await User.findById(assignedTo);
    if (assignedUser?.email) {
      const message = `
        <p>New Bug Assigned</p>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Status:</strong> ${status}</p>
        <p><strong>Priority:</strong> ${priority}</p>
        <p><strong>Assigned To:</strong> ${assignedUser.name}</p>
        <img src="${screenshot}" alt="Bug Screenshot" style="max-width: 100%; height: auto;" />
      `;
      await MailResponse(assignedUser.email, "New Bug", message);
    }

    await newBug.save();
    return res.status(201).json({ message: "Bug reported successfully", bug: newBug });

  } catch (err) {
    console.error("Bug creation error:", err);
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
};


exports.GetBug = async (req, res) => {
  try {
    const bugs = await Bug.find().populate('reportedBy assignedTo', 'name email');
    return res.status(200).json(bugs);
  } catch (err) {
    console.error("GetBug Error:", err);
    return res.status(500).json({ message: "Failed to retrieve bugs", error: err.message });
  }
};

exports.GetBugById=async(req,res)=>{
  try{
    const bugId=req.params.id
    const getBugs=await Bug.findById(bugId)
    if(!getBugs){
      return res.status(404).json({message:"Bug not found"})
    }
    return res.status(200).json({Message : "Bug retrieved successfully ",data : getBugs})
  } catch(err){
    console.log("Get Bug by Id Error : ",err)
    return res.status(500).json({ message: "Failed to retrieve bugs", error: err.message })
  }
}

exports.UpdateBug = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const bug = await Bug.findById(id);
    if (!bug) {
      return res.status(404).json({ message: "Bug not found" });
    }

    bug.status = status;
    await bug.save();

    return res.status(200).json({ message: "Status updated", bug });
  } catch (err) {
    console.error("UpdateBugStatus Error:", err);
    return res.status(500).json({ message: "Failed to update status", error: err.message });
  }
};

exports.BugStatus=async(req,res)=>{
  const bugs=await Bug.countDocuments()
  const open=await Bug.countDocuments({status:'open'})
  const inProgress=await Bug.countDocuments({status:'in-progress'})
  const closed=await Bug.countDocuments({status:'closed'})

  res.json({bugs,open,inProgress,closed});
}

exports.BugCondition=async(req,res)=>{
  const low=await Bug.countDocuments({priority:'low'})
  const medium=await Bug.countDocuments({priority:'medium'})
  const high=await Bug.countDocuments({priority:'high'})
  const critical=await Bug.countDocuments({priority:'critical'})

  res.json({low,medium,high,critical})
}

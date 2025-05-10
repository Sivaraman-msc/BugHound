const bcrypt=require('bcryptjs');
const User = require('./Model/user');
const Bug = require('./Model/bug');
const Comment = require("../Model/comment");
const { DbConnect } = require('./Config/db');

const seedUsers=async()=>{
    const salt=await bcrypt.salt(10)

    const users=[
        {
            name:"Sivaraman S",
            email:"Sivaraman.bca.st@gmail.com",
            password: bcrypt.hash('Leo_Leo',salt),
            role:"Developer",
            profile:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJoQNlJOt_DtR7uFbKnzZTeS7MCy1NQ1DChA&s"
        },{
            name:"Jennifer V",
            email:"Jennifer@gmail.com",
            password: bcrypt.hash('Jeni_Jeni',salt),
            role:"Tester",
            profile:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRigi9uPjR4JuXlogaE5FPlwvufh8kLJd7TPg&s"
        },{
            name:"Angelina",
            email:"Angelina@gmail.com",
            password: bcrypt.hash('Angelina1',salt),
            role:"ProjectManager",
            profile:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpFe_14zMNA2bAuFS3qkYPKJ4Lfw3o7xml0A&s"
        }
    ]
    await User.insertMany(users);
    console.log('Users Seeded');
  };

const SeedBugs=async()=>{
    const tester = await User.findOne({ role: 'Tester' });
    const developer = await User.findOne({ role: 'Developer' });

    const bugs = [
        {
          title: 'Login button not working',
          description: 'Login button does not respond on click in Chrome browser.',
          status: 'open',
          priority: 'high',
          reportedBy: tester._id,
          assignedTo: developer._id,
          screenshot: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH0FJfYkmYePn3kGdrotAaBdCCY6y_0gJImA&s'
        },
        {
          title: 'Image upload failure',
          description: 'Images larger than 5MB fail to upload with no error shown.',
          status: 'in-progress',
          priority: 'medium',
          reportedBy: tester._id,
          assignedTo: developer._id,
          screenshot: 'data:image/png;base64,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'
        }
      ];
    
      await Bug.insertMany(bugs);
      console.log('Bugs Seeded');
}

const SeedComments = async () => {
    const bugs = await Bug.find();
    const users = await User.find();

    const comments = bugs.map((bug) => {
        return {
            comment: 'This is a test comment for bug ' + bug.title,
            user: users[Math.floor(Math.random() * users.length)]._id,
            bugId: bug._id
        };
    });

    await Comment.insertMany(comments);
    console.log("Comments Seeded");
};


const seedData=async()=>{
    try {
    await DbConnect()
    
    await seedUsers()
    await SeedBugs()
    await SeedComments

    console.log('All Data Seeded Successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
seedData();
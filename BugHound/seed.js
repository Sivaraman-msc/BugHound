const mongoose = require('mongoose');
const User = require('./Model/user');
const Bug = require('./Model/bug');
const Comment = require('./Model/comment');
require('dotenv').config();

const DB = process.env.MONGO_URI;

mongoose.connect(DB)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

const seedData = async () => {
  try {
    const tester = await User.create({
      name: 'Siva',
      email: 'siva@gmail.com',
      password: '12345678',
      role: 'Tester',
      profile: 'https://i.pravatar.cc/150?img=1' 
    });

    const developer = await User.create({
      name: 'Angelina',
      email: 'angelina@gmail.com',
      password: '12345678',
      role: 'Developer',
      profile: 'https://i.pravatar.cc/150?img=2'
    });

    const pm = await User.create({
      name: 'Ram',
      email: 'ram@gmail.com',
      password: '12345678',
      role: 'ProjectManager',
      profile: 'https://i.pravatar.cc/150?img=3'
    });

    const bugs = await Bug.create([
      {
        title: 'Login button not working',
        description: 'Clicking login does nothing.',
        status: 'open',
        priority: 'high',
        reportedBy: tester._id,
        assignedTo: developer._id,
        screenshot: 'https://via.placeholder.com/300x200.png?text=Login+Bug'
      },
      {
        title: 'Dashboard crashes on load',
        description: 'Dashboard page crashes with 500 error.',
        status: 'in-progress',
        priority: 'critical',
        reportedBy: tester._id,
        assignedTo: developer._id,
        screenshot: 'https://via.placeholder.com/300x200.png?text=Dashboard+Bug'
      },
      {
        title: 'Profile picture not updating',
        description: 'New profile picture does not reflect.',
        status: 'closed',
        priority: 'medium',
        reportedBy: tester._id,
        assignedTo: developer._id,
        screenshot: 'https://via.placeholder.com/300x200.png?text=Profile+Bug'
      },
      {
        title: 'Navbar links broken',
        description: 'Some links in navbar are not clickable.',
        status: 'open',
        priority: 'low',
        reportedBy: pm._id,
        assignedTo: developer._id,
        screenshot: 'https://via.placeholder.com/300x200.png?text=Navbar+Bug'
      },
      {
        title: 'Search functionality slow',
        description: 'Searching takes too long to return results.',
        status: 'in-progress',
        priority: 'medium',
        reportedBy: tester._id,
        assignedTo: developer._id,
        screenshot: 'https://via.placeholder.com/300x200.png?text=Search+Bug'
      },
      {
        title: 'Notifications not appearing',
        description: 'No notifications are shown after actions.',
        status: 'closed',
        priority: 'high',
        reportedBy: pm._id,
        assignedTo: developer._id,
        screenshot: 'https://via.placeholder.com/300x200.png?text=Notification+Bug'
      },
      {
        title: 'Settings page layout broken',
        description: 'UI misalignment in settings page.',
        status: 'in-progress',
        priority: 'low',
        reportedBy: tester._id,
        assignedTo: developer._id,
        screenshot: 'https://via.placeholder.com/300x200.png?text=Settings+Bug'
      }
    ]);

    await Comment.create([
      {
        bug: bugs[0]._id,
        user: developer._id,
        content: 'Working on fixing the login issue.'
      },
      {
        bug: bugs[1]._id,
        user: pm._id,
        content: 'Please prioritize the dashboard crash.'
      },
      {
        bug: bugs[4]._id,
        user: tester._id,
        content: 'Search is still slow even after optimization.'
      }
    ]);

    console.log('Seed data created successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();

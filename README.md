#  BugHound - Bug Tracking Application

BugHound is a role-based bug tracking system developed with modern web technologies. It allows testers to report bugs, developers to update statuses, and project managers to coordinate and comment efficiently.

---

##  Technologies Used

- ReactJS
- Node.js / Express
- MongoDB
- TailwindCSS
- Chart.js
- CKEditor
- Yup
- JWT for authentication

---

##  Features

- Role-based authentication: Tester, Developer, Project Manager
- Bug reporting with status (`Open`, `In Progress`, `Closed`) and condition (`Critical`, `High`, `Low`)
- Real-time email notifications
- Comment system between roles
- Graphical bug status and condition charts
- Image upload (profile)
- Validation with Yup and secure routing

---

## Data
cd BugHound 
npm run seed 

Role : Tester   - email :  	 siva@gmail.com  - password : 12345678
	
Role : Developer - email : 	angelina@gmail.com - password : 12345678
	
Role : ProjectManager- email :	ram@gmail.com - password : 12345678
	

----

## Quick Start

Run these commands to quickly set up and start the project:

```bash
# Clone the repository
git clone <your-repo-url>
cd BugHound 

# Install backend dependencies

>**Note:** We’ve removed strict mode because of CKEditor, so you need to use `--force` when installing.

cd BugHound
npm install --force 

# Seed the database with initial data
npm run seed

# Start the backend server
npm start

# Open a new terminal, install frontend dependencies
cd Bug_Hound_UI
npm install

# Start the frontend development server
npm run dev


---

## Environment Setup

Create a `.env` file inside the **CodeSieve-Backend** folder with the following keys:

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_KEY=your_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
CLOUD_NAME=dotudwq8w
CLOUD_API_KEY=499966814948442
CLOUD_API_SECRET=gbR3nu3cWkExDm-pcx4QAAzjnLM
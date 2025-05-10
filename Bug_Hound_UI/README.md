1.Project Initialization: Set up a modern React project using Vite for fast development with TailwindCSS for styling and responsive UI design.

2.Role-Based Architecture: Defined three core roles — Tester, Developer, and Project Manager — each with specific permissions and responsibilities.

3.User Authentication: Integrated signup/login with form validation using React Hook Form and Yup. Included email & password authentication and optional image upload.

4.Real Email Notification Setup: Implemented email notifications to alert Developers and Project Managers about new bug reports and comments.

5.Signup Flow: Users sign up by providing a valid email, selecting a role, and uploading a profile image. They are authenticated and redirected based on role.

6.Login Flow: Minimal login form using email and password. Session is authorized via cookies for secure access.

7.Dashboard UI: A personalized dashboard welcomes users with their name and role, displaying an overview of the system.

8.Bug Status Visualization: Built a dynamic bug status chart using Chart.js, showing the distribution of bugs (Open, In Progress, Closed).

9.Bug Condition Analysis: Added a second chart to represent bug criticality levels (High, Critical, Low), helping prioritize issues.

10.Bug Reporting (Tester): Testers can submit new bugs with relevant details and condition. The data is sent to Developers via email.

11.Status Update (Developer): Developers update bug statuses (e.g., from "In Progress" to "Closed") and view all assigned reports. Implemented PATCH API integration.

12.Commenting System (Project Manager): PMs can add comments about bugs, request updates from Developers, or notify Testers when a bug is resolved.

13.Comment Access (All Roles): Testers and Developers receive comments via email and can view them on the comment page. PMs have delete permissions.

14.Data Section: Displays registered user information — pulled from signup data — visible to all roles for transparency.

15.Reusable Components: Created modular components such as NavBar, SideNav, BugStatusChart, BugCondition, and MyEditor for consistency.

16.Rich Text Editor: Integrated CKEditor for Project Managers to write detailed and formatted comments.

17.Protected Routes: Used custom hooks (useAuth) and route guards to restrict page access based on user role and login status.

18.API Integration: Connected with backend services for signup, login, bug CRUD operations, comment management, and role-based data fetch.

19.Responsive Design: Fully responsive layout using TailwindCSS with clean UI across desktop and mobile.

20.Security and Deployment: Applied role-based access control for secure content access. Prepared the app for deployment with environment configurations.

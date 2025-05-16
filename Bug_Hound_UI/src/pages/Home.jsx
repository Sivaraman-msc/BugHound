import React from 'react'
import '../index.css'
import NavBar from '../components/NavBar'
import SideNav from '../components/SideNav'
import BugStatusChart from '../components/BugStatusChart'
import BugCondition from '../components/BugCondition'
import MyEditor from '../components/MyEditor'
import UseAuth from '../hooks/useAuth'
import Footer from '../components/Footer'

export default function Home() {
  const { user } = UseAuth();
  return (
    <>
      <NavBar />
      <div className="min-h-screen mt-1 flex ">
        <SideNav />
        <div className="flex-1 p-6 loginBackground">

          <div className="mb-8">
            <h1 className="text-sm lg:text-base font-semibold lg:font-normal">
              <div className='font-semibold'>Welcome <strong>{user.name}</strong>,</div>
              As a valued <strong>{user.role}</strong> at Leo Technologies, we're thrilled to have you onboard. Leo Technologies is one of the most innovative and forward-thinking companies, always striving for excellence in delivering high-quality software solutions. We are proud to offer this platform, designed specifically for bug reporting, live status updates, and seamless communication among team members.
            </h1>
          </div>

          <div className="mb-8">
            <BugStatusChart />
          </div>

          <div className="mb-8">
            <h2 className="text-sm lg:text-base font-semibold lg:font-normal">
              Here you can get an overview of the current bug statuses — whether they are open, in progress, or closed. Our dedicated Testers and Developers are working diligently to resolve each issue, while the Project Manager oversees progress and ensures all tasks are on track. Their collaboration ensures that bugs are handled effectively and efficiently.
            </h2>
          </div>

          <div className="mb-8">
            <BugCondition />
          </div>

          <div className="mb-8">
            <h2 className="text-sm lg:text-base font-semibold lg:font-light">
              Our Testers pay special attention to the criticality of each bug. They assess and set conditions (e.g., high, critical, low) based on the bug's impact, ensuring that urgent issues are prioritized. After the Testers report the bugs, our Developers receive detailed information via email, so please provide a real email address during signup to ensure you receive timely notifications.
            </h2>
            <h2 className="text-sm lg:text-lg font-semibold lg:font-light">
              The Project Manager ensures smooth coordination between Testers and Developers, managing their workflow and providing feedback about their work through comments. This keeps the entire team aligned and informed at all times.
            </h2>
          </div>
          <MyEditor />

          <div className="mb-8">
            <h2 className="text-sm lg:text-base font-semibold lg:font-light">
              We've enhanced this application by integrating some of the most popular and robust libraries like Chart.js, CKEditor, Yup, and TailwindCSS to offer you an optimized and efficient user experience. And of course, we ensure the highest level of security with role-based access, keeping our platform safe and tailored to each user's role and permissions.
            </h2>
          </div>

        </div>
      </div>
      <Footer />
    </>
  )
}

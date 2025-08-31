import React from 'react'
import NavBar from '../components/NavBar'
import SideNav from '../components/SideNav'
import BugStatusChart from '../components/BugStatusChart'
import BugCondition from '../components/BugCondition'
import MyEditor from '../components/MyEditor'
import UseAuth from '../hooks/useAuth'
import Footer from '../components/Footer'

export default function Home() {
  const { user } = UseAuth()

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1 bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-800 text-white">
        <SideNav />
        <main className="flex-1 p-8 md:p-12 space-y-10 overflow-y-auto">

          <section className="bg-black/50 backdrop-blur-md rounded-2xl p-8 shadow-lg">
            <h1 className="text-4xl font-bold mb-4 text-indigo-400">
              Welcome Back, <span className="text-white">{user.name}</span>!
            </h1>
            <p className="text-white/90 text-lg leading-relaxed">
              As a <strong>{user.role}</strong> at BugHound, you have access to real-time bug tracking, collaborative updates, and seamless communication across your team. Stay informed, stay productive.
            </p>
          </section>

          <section className="bg-black/50 backdrop-blur-md rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-indigo-300">Bug Status Overview</h2>
            <BugStatusChart />
            <p className="mt-4 text-white/80">
              Track bugs — open, in progress, or closed — at a glance. Testers, Developers, and Project Managers collaborate efficiently to ensure every issue is resolved promptly.
            </p>
          </section>

          <section className="bg-black/50 backdrop-blur-md rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-indigo-300">Bug Priorities & Conditions</h2>
            <BugCondition />
            <p className="mt-4 text-white/80">
              Testers assess criticality to prioritize urgent issues. Developers receive detailed notifications for timely resolutions. Project Managers oversee workflow and coordinate feedback efficiently.
            </p>
          </section>

          <section className="bg-black/50 backdrop-blur-md rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-indigo-300">Collaboration & Comments</h2>
            <MyEditor />
            <p className="mt-4 text-white/80">
              Streamline communication via comments. Keep the team aligned, track updates, and ensure that all critical bugs are handled with priority.
            </p>
          </section>

          <section className="bg-black/50 backdrop-blur-md rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-300">Optimized & Secure</h2>
            <p className="text-white/80 text-lg leading-relaxed">
              BugHound integrates Chart.js, CKEditor, Yup, and TailwindCSS for a smooth, efficient experience. Role-based access ensures security while providing functionality tailored to your responsibilities.
            </p>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  )
}

import React from 'react'
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 px-4">
      <div className="flex flex-wrap justify-center gap-8 mb-4">
        <a href="https://www.linkedin.com/in/sivaraman-msc-cs" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 text-4xl" >
          <FaLinkedin />
        </a>

        <a href="https://github.com/Sivaraman-Msc" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 text-4xl" >
          <FaGithub />
        </a>

        <a href="mailto:sivaraman.bca.st@gmail.com" className="text-white hover:text-red-400 text-4xl" >
          <FaEnvelope />
        </a>
      </div>

      <div className="text-center text-sm text-gray-400">
        <p>sivaraman.bca.st@gmail.com</p>
        <p>Kalanivasal, karaikkudi , Tamil Nadu - 630002</p>
      </div>
    </footer>
  )
}

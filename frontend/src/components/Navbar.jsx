import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 fixed border-left ">
        <ul className='flex flex-col m-4'>
            <li className='nav-link'><Link to='/'>Home</Link></li>
            <li className='nav-link'><Link to='/chatbot'>Chatbot</Link></li>
            <li className='nav-link'><Link to='/tti'>Text-to-Image</Link></li>
        </ul>
    </div>
  )
}

export default Navbar

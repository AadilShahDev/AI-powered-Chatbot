import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  let [history,setHistory] = useState([])
  const fetchHistory = async()=>{
    try{
    let data = await fetch('http://localhost:5000')
    if(data){
      console.log("title:",data.title)
      data = await data.json()
      setHistory([...history,data.title])
    }
  }catch(err){
    console.log("error : ",err)
  }
  }
useEffect(()=>{
  fetchHistory()
},[])
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 fixed border-left ">
        <ul className='flex flex-col m-4 h-[40%]'>
            <li className='nav-link'><Link to='/'>Home</Link></li>
            <li className='nav-link'><Link to='/chatbot'>Chatbot</Link></li>
            <li className='nav-link'><Link to='/tti'>Text-to-Image</Link></li>
        </ul>


        <div>
          <i>Past Conversations</i>
          {history.map((title,index)=>(
            <div className='nav-link' key={index}>{title}</div>
          ))}
        </div>
    </div>
  )
}

export default Navbar

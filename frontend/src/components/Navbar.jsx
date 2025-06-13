import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { Menu } from 'lucide-react'; // Icon from lucide-react

function Navbar() {
  const [toggle, setToggle] = useState(false);
  const auth = localStorage.getItem('user')
  const navigate = useNavigate()

  useEffect(()=>{
    if(auth){
      setToggle(true)
    }
    else{
      setToggle(false)
    }
  })

  // const toggleSidebar = () => {
  //   setToggle(!toggle);
  // };

  const logout = ()=>{
    localStorage.clear()
    window.dispatchEvent(new Event("authChanged")); // notify App
    navigate('/login')
  }

  return (
    <>
      {/* Hamburger Button 
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4  bg-white border border-gray-300 p-2 rounded-lg shadow hover:bg-pink-50 transition"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      /* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-md z-40 transform transition-transform duration-300 ease-in-out ${
          toggle ? 'translate-x-0 w-64' : '-translate-x-full'
        }`}
      >
        {/* Close Button (Hamburger Again) */}
        {/* <button
          onClick={toggleSidebar}
          className="absolute top-4 left-56 p-1 text-gray-700 hover:text-pink-600 "
        >
          <Menu className="w-6 h-6" />
        </button> */}

        {/* Sidebar Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-pink-600 mb-6">MMC-AI</h2>
          <ul className="space-y-4 text-lg font-medium text-gray-800">
             {auth? 
              <> 
                <li>
                  <Link to="/"  className="hover:text-pink-600 transition">Home</Link>
                </li>
                <li>
                  <Link to="/chatbots"  className="hover:text-pink-600 transition">Chatbots</Link>
                </li>
                <li>
                  <Link to="/tti"  className="hover:text-pink-600 transition">Text-to-Image</Link>
                </li>
                
                <li>
                  <Link to="/tts" className="hover:text-pink-600 transition">Text-to-Speech</Link>
                </li>
                <li>
                  <Link to="/itt" className="hover:text-pink-600 transition">Image-to-text(OCR)</Link>
                </li>
                 <li>
                  <Link to="/profile" className="hover:text-pink-600 transition">Profile</Link>
                </li>
                
                {/* <li>
                  <Link to="/vtt" className="hover:text-pink-600 transition">Voice-to-text</Link>
                </li> */}
              </>:<></>}
                {auth?
                  <li>
                    <Link onClick={logout} to="/signup" className="hover:text-pink-600 transition">Logout</Link>
                  </li>
                :
                  <>
                    
                  </>
                }
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;










































// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { useSelector,useDispatch } from 'react-redux'
// //import { reNewChatID } from './redux/newChatSlice'

// function Navbar() {
//   let [history,setHistory] = useState([])
//   let [toggle,setToggle] = useState(true)
//   const chatCounter = useSelector(state=>state.counter.chatCounter)
//   const dispatch = useDispatch()
  
//   // const fetchHistory = async()=>{
//   //   try{
//   //   let data = await fetch('http://localhost:5000')
//   //   if(data){
//   //     data = await data.json()
//   //     data=data.reverse()
//   //      setHistory(data)
//   //      dispatch(reNewChatID(data[0].chatID))
//   //    }
//   //   }catch(err){
//   //     console.log("error : ",err)
//   //   }
//   // }

// // useEffect(()=>{
// //   fetchHistory()
// // },[chatCounter])

// const toggleSidebar = () =>{
//   setToggle(!toggle)
//   }



//   return (
//     <>
//     <button className='fixed top-0 left-0 border' onClick={toggleSidebar}>sidebar</button>
//     <div className={`w-64 h-screen bg-gray-800 text-white p-4 fixed border-left transform transition-transform duration-500 ease-in-out z-50 ${toggle? 'translate-x-0' : '-translate-x-full'} `}>
//       <button className='fixed top-0 left-48 border' onClick={toggleSidebar}>sidebar</button>
//         <ul className='flex flex-col m-4 h-[40%]'>
//             <li className='nav-link'><Link to='/'>Home</Link></li>
//             <li className='nav-link'><Link to='/chatbots'>Chatbots</Link></li>
//             <li className='nav-link'><Link to='/tti'>Text-to-Image</Link></li>
//             <li className='nav-link'><Link to='/signup'>Signup</Link></li>
//             <li className='nav-link'><Link to='/login'>Login</Link></li>
//         </ul>
//         {/* <i>Past Conversations</i>
//         <div className='h-[50%] overflow-y-auto'>
//           {history.map((convo,index)=>(
//             <div className='nav-link' key={index} onClick={()=>{dispatch(reNewChatID(convo.chatID))}}>{convo.title? convo.title:`Chat # : ${index+1}`} </div>
//           ))}
//         </div> */}
//     </div>
//     </>
//   )
// }

// export default Navbar



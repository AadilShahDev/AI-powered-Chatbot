import React, { useState } from 'react'

function Chatbot() {

  const KEY = process.env.REACT_APP_API_KEY;
  let [query,setQuery] = useState('');
    let [response,setResponse] = useState('')
    let [conversation,setConversation] = useState([])

    const requestBody = {
    contents: [
      {
        parts: [
          {
            text: query
          }
        ]
      }
    ]
  };
  

    const fetchData = async() =>{
      
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${KEY}`,{
            method:'post',
            headers:{
                "Content-type" : 'application/json'
            },
            body: JSON.stringify(requestBody
            )   
        })
        const data = await res.json();
        console.log(data);

        if (data.candidates && data.candidates.length > 0) {
            setResponse(data.candidates[0].content.parts[0].text);
  
        } else {
            setResponse('No response generated.');
          }

          
          setConversation(prev => [...prev, query, response])
    }

    const handleChange = (e) =>{
        setQuery(e.target.value)
    }


  return (
    <>
    <div className='h-[670px] overflow-y-auto p-4'>
      {conversation.map((item,index)=>(
        <div key={index} className='bg-gray-200 rounded-xl m-2 p-4' >
          {item}
        </div>
      ))}
    </div>
    <div className='fixed bottom-0 flex justify-center items-center border m-4 w-[70%] md:w-[60%] rounded-xl border-gray-700 m-8 p-2' >
        <input className='border rounded-xl p-2 m-2 w-[85%]'  type='text' placeholder='Ask anything.....' onChange={handleChange}/>
        <button className='border border-gray-700 w-[20%] ml-0 m-4' onClick={fetchData}>Send</button>
    </div>
    </>
  )
}

export default Chatbot

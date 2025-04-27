import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown';

function Chatbot() {

  const KEY = process.env.REACT_APP_API_KEY;
  let [query,setQuery] = useState('');
    let [response,setResponse] = useState('')
    let [conversation,setConversation] = useState([])

    useEffect(()=>{
      setConversation(prev => [...prev, {sender:'user',message:query}, {sender:'bot',message:response}])
      console.log(conversation)
      uploadConversation();
    },[response])

    const uploadConversation = async()=>{
      let result = await fetch("http://localhost:5000/data",{
        method:'post',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          messages: conversation.filter(c => c.sender && c.message) // Only valid messages
        })
      })
      result = await result.json()
      console.log("Results :: ",result)
    }

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
    }

    const handleChange = (e) =>{
        setQuery(e.target.value)
    }


  return (
    <>
    <div className='w-[90%] flex flex-col justify-center items-center'>
    <div className='h-[670px] overflow-y-auto p-4'>
      {conversation.map((item,index)=>( 
        <div key={index} className='flex flex-col text-xl' >
          {index%2!==0 && index >2? 
          <div className='m-4 p-2'><ReactMarkdown>{item.message}</ReactMarkdown></div>
          :
          <div className='flex bg-gray-100 rounded-xl m-2 p-4 self-end'>
            {item.message}
          </div>
          }
        </div>
      ))}
    </div>

    <div className='fixed bottom-0 flex justify-center items-center border m-4 w-[70%] md:w-[55%] sm:w-[50%] rounded-xl border-gray-700 m-8 p-2' >
        <input className='border rounded-xl p-2 m-2 w-[85%]'  type='text' placeholder='Ask anything.....' onChange={handleChange}/>
        <button className='border border-gray-700 w-[20%] ml-0 m-4' onClick={fetchData}>Send</button>
    </div>
    </div>
    </>
  )
}

export default Chatbot

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from './redux/newChatSlice';
import ReactMarkdown from 'react-markdown';

const OpenRouterDirect = () => {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const conversation = useSelector((state) => state.counter.openrouter);
  const dispatch = useDispatch();

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: 'user', message: userInput };
    dispatch(addMessage({ bot: 'openrouter', message: userMessage }));
    setUserInput('');
    setLoading(true);

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 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',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mistralai/mixtral-8x7b-instruct',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: userInput },
          ],
        }),
      });

      const data = await res.json();
      const botReply = data?.choices?.[0]?.message?.content || 'No response generated.';
      const botMessage = { sender: 'bot', message: botReply };
      dispatch(addMessage({ bot: 'openrouter', message: botMessage }));
    } catch (err) {
      console.error(err);
      const errorMessage = { sender: 'bot', message: 'Failed to fetch AI response.' };
      dispatch(addMessage({ bot: 'openrouter', message: errorMessage }));
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-start px-4 pt-24 pb-32">
      <div className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
        OpenRouter-Powered Chatbot
      </div>

      {/* Chat display area */}
      <div className="w-full max-w-4xl h-[600px] overflow-y-auto bg-gray-50 rounded-xl p-6 shadow-inner space-y-4">
        {conversation.map((item, index) => (
          <div key={index} className={`flex ${item.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-base shadow-md whitespace-pre-wrap ${
                item.sender === 'user'
                  ? 'bg-pink-600 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              <ReactMarkdown>{item.message}</ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] px-4 py-3 rounded-2xl text-base shadow-md bg-gray-200 text-gray-800 rounded-bl-none">
              <p>Typing...</p>
            </div>
          </div>
        )}
      </div>

      {/* Input box */}
      <div className="fixed bottom-0 w-full flex justify-center items-center px-4 pb-6">
        <div className="w-full max-w-3xl flex bg-white border border-gray-300 shadow-md rounded-full overflow-hidden">
          <textarea
            rows={1}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 px-5 py-3 text-gray-800 placeholder-gray-400 focus:outline-none resize-none"
            placeholder="Ask anything..."
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 font-medium transition disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpenRouterDirect;












































// import React, { useState } from 'react';

// const OpenRouterDirect = () => {
//   const [userInput, setUserInput] = useState('');
//   const [response, setResponse] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSend = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           'Authorization': 'Bearer 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', // 🔥 Not safe in frontend!
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           model: 'mistralai/mixtral-8x7b-instruct',
//           messages: [
//             { role: 'system', content: 'You are a helpful assistant.' },
//             { role: 'user', content: userInput },
//           ],
//         }),
//       });

//       const data = await res.json();
//       setResponse(data.choices[0].message.content);
//     } catch (err) {
//       console.error(err);
//       setResponse('Failed to fetch AI response.');
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
//       {/* Chat Header */}
//       <div className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
//       OpenRouter-Powered Chatbot
//     </div>


//       {/* Chat Messages */}
//       <div className="h-80 overflow-y-auto p-4 bg-gray-50 rounded-lg shadow-inner">
//         <div className="flex flex-col space-y-4">
//           <div className="flex justify-start">
//             <div className="bg-blue-100 p-3 rounded-lg max-w-[70%]">
//               <p className="text-gray-800">{userInput}</p>
//             </div>
//           </div>
//           <div className="flex justify-end">
//             {loading ? (
//               <div className="bg-pink-100 p-3 rounded-lg max-w-[70%]">
//                 <p className="text-gray-800">Loading...</p>
//               </div>
//             ) : (
//               response && (
//                 <div className="bg-gray-100 p-3 rounded-lg max-w-[70%]">
//                   <p className="text-gray-800">{response}</p>
//                 </div>
//               )
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Input and Send Button */}
//       <div className="flex flex-col sm:flex-row items-center mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
//         <textarea
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//           className="w-full p-4 border rounded-xl bg-transparent placeholder-gray-400 text-gray-800 focus:outline-none"
//           placeholder="Ask something..."
//           rows={4}
//         />
//         <button
//           onClick={handleSend}
//           className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 font-medium rounded-full transition duration-200"
//         >
//           {loading ? 'Sending...' : 'Send'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OpenRouterDirect;



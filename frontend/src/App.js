import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import TextToImg from './components/textToImg';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Models from './components/Models';
import OpenRouterDirect from './components/OpenRouter';
import Gemini from './components/Chatbot';
import Logout from './components/authComponents/logout';


function App() {
  return (
    <div className="">
      <BrowserRouter>
      <Navbar/>
        <div className='ml-64 p-4'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/chatbots' element={<Models/>}>
              <Route path='gemini' element={<Gemini/>}/>
            < Route path='openrouter' element={<OpenRouterDirect/>}/>
            </Route>
            <Route path='/tti' element={<TextToImg/>}/>
            <Route path='/logout' element={<Logout/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

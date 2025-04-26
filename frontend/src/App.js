import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Chatbot from './components/Chatbot';
import TextToImg from './components/textToImg';
import Home from './components/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="">
      <BrowserRouter>
      <Navbar/>
        <div className='ml-64 p-4'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/chatbot' element={<Chatbot/>}/>
            <Route path='/tti' element={<TextToImg/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

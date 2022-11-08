import './css/App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './components/Chat';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3002")

function App() {


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register></Register>} />
          <Route exact path='/login' element={<Login></Login>} />
          <Route exact path='/' element={<Chat socket={socket}></Chat>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

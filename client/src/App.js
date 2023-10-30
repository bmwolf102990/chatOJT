// import './App.css';

// import Title from './components/Title/Title';
// import Chatbot from './components/chatbot/Chatbot';

// import LoginInfo from './components/login/LogInInfo';


// import {useState} from "react"


// function App() {
//   const [isModalOpen, setIsModalOpen] = useState(true);
//   const [userName, setUserName]=useState("")
//   const [password, setPassword]=useState("")

//   const [isLoggedIn, setIsLoggedIn] = useState(false); // New state variable


  
//   return (


//     <div className="App">
//     <Title />

//     {isLoggedIn ? (
//       <Chatbot />
//     ) : (
//       // Conditionally render the modal and LoginInfo component
//       <div className="modal-overlay">
//         <div className="modal-content">
//           <LoginInfo setUserName={setUserName} userName={userName} password={password} setPassword={setPassword} setIsLoggedIn={setIsLoggedIn} />
//         </div>
//       </div>
//     )}
//   </div>
//   );
// }

// export default App;


import './App.css'
import Chatbot from "./components/chatbot/Chatbot"
import Login from "./components/login/Login"
import Register from "./components/login/Register"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';

import Title from "./components/Title/Title"


function App({updateUser}) {
  const [loginUser, setLoginUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('MyUser'));
    if (savedUser) {
      setLoginUser(savedUser);
    }
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem('MyUser', JSON.stringify(userData));
    setLoginUser(userData);
  };

  return (
    <div className="App">
      <Title />
      <Router>
      

        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={loginUser ? <Navigate to="/chatbot" /> : <Login setLoginUser={setLoginUser}  onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chatbot" element={loginUser ? <Chatbot updateUser={updateUser} setLoginUser={setLoginUser}/> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;




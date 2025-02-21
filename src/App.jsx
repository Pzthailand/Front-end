import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { _CurrentUser } from './Components/Functions/Auth';
import { useNavigate } from "react-router-dom";
import { Navbar } from './Components/Layouts/Navbar';
import { Routed } from './Components/Layouts/Routed';
import { loggedInUsers } from './Components/Reducer/userSlice'; // Import your action creator
import { Footer } from './Components/Layouts/Footer';

function App() {
  // Redux
  const dispatch = useDispatch();
  const tokenId = localStorage.getItem('token'); // Get token from local storage
  //const tokenId = sessionStorage.getItem('token'); // Get token from session storage
  useEffect(() => {
    if (tokenId) {
      _CurrentUser(tokenId)
        .then(res => {
          dispatch(loggedInUsers({ 
            id: res.data._id,
            username: res.data.username,
            email : res.data.email,
            phone : res.data.phone,
            token: tokenId,
            role: res.data.role,
            file : res.data.file,
            cart : res.data.cart,
            problemstatus : res.data.problemstatus,
          }));
        })
        .catch(err => {
          console.error('Error:', err);
          // Optionally: dispatch an action to handle errors
        });
    }
  }, [tokenId, dispatch]);

  return (
    <div>
      <Navbar />
      <Routed />
      <Footer />
    </div>
  );
}

export default App;
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './App.css';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'; // Import from Redux Toolkit
import userReducer from './Components/Reducer/userSlice'; // Adjust path as necessary
import userVerifyOTPReducer from './Components/Reducer/userVerifyOTP'

// Create the Redux store with Redux Toolkit
const store = configureStore({
  reducer: {
    user: userReducer,
    account : userVerifyOTPReducer, // Use your user slice here
  },
  // You can add middleware and other options here if needed
  //devTools: process.env.NODE_ENV !== 'production', // Enable DevTools only in development
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
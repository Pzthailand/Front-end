import { configureStore } from '@reduxjs/toolkit';
import userVerifyOTP from './userVerifyOTP'; // Adjust the path as necessary

const store = configureStore({
    reducer: {
        account : userVerifyOTP,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware(), // Add custom middleware if needed
    devTools: process.env.NODE_ENV !== 'production', // Enable DevTools only in development
});

export default store;
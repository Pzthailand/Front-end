import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Adjust the path as necessary

const store = configureStore({
    reducer: {
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware(), // Add custom middleware if needed
    devTools: process.env.NODE_ENV !== 'production', // Enable DevTools only in development
});

export default store;
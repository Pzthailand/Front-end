import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        loggedInUsers(state, action) {
            return action.payload; // Use 'payload' for consistency
        },
        loggedOutUsers(state) {
            localStorage.removeItem("token");
            //sessionStorage.removeItem("token");
            return null; // Reset state on logout
        },
        signUpUsers(state, action) {
            return action.payload; // Use 'payload' for consistency
        },
        forgotPassword(state, action) {
            return action.payload; // Use 'payload' for consistency
        },
       
    },
});

// Export actions
export const { 
    loggedInUsers, 
    loggedOutUsers, 
    signUpUsers, 
    forgotPassword, 
} = userSlice.actions;

// Export reducer
export default userSlice.reducer;
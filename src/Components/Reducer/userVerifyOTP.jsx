import { createSlice } from '@reduxjs/toolkit';

const userVerifyOTP = createSlice({
    name: 'account',
    initialState: null,
    reducers: {
        verifyEmailOTP(state, action) {
            return action.payload; // Use 'payload' for consistency
        },
        verifyPhoneOTP(state, action) {
            return action.payload; // Use 'payload' for consistency
        },
    },
});

// Export actions
export const {
    verifyEmailOTP, 
    verifyPhoneOTP 
} = userVerifyOTP.actions;

// Export reducer
export default userVerifyOTP.reducer;
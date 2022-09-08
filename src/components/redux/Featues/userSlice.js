import { createSlice } from '@reduxjs/toolkit';


export const userSlice = createSlice({
    name: 'user',
    initialState : {
        user : null
    },
    reducers: {
        _login : (state,action) => {
            state.user = action.payload
        },
        _logout : (state,action) => {
            state.user = null
        }
    }
})


export const {_login,_logout} = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    isLoggedIn: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoggedIn: (state, action) => {
            state.isLoggedIn = true;
            state.user = { ...action.payload }
        },
        logout: (state) => {
            state.isLoggedIn = false
            state.user = {}
        },
        updateUser: (state,action)=>{
            state.user = { ...state.user, customerId: action.payload}
        }
    }
})
export const { logout, setLoggedIn, updateUser } = userSlice.actions

export default userSlice.reducer
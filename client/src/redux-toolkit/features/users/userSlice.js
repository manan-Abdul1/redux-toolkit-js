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
        }
    }
})
export const { logout, setLoggedIn } = userSlice.actions

export default userSlice.reducer
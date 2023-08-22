import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: {},
    isLoggedIn: false,
}

export const createNewUser = createAsyncThunk('user/createNewUser', async (newUserObj) => {
    try {
        const response = await axios.post("http://localhost:5500/user/createNewUser", newUserObj);
        return response.data;
    } catch (error) {
        return error.response.data.error;
    }
})



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
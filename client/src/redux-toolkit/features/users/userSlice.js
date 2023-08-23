import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_BASE_URL } from "../../../utils/serverUrl";

const initialState = {
    user: {},
    isLoggedIn: false,
}

export const createNewUser = createAsyncThunk('user/createNewUser', async (newUserObj) => {
    try {
        await axios.post(`${USER_BASE_URL}/createNewUser`, newUserObj);
    } catch (error) {
        return  error.response.data
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
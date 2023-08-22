import axios from "axios";
import { setLoggedIn } from "../features/users/userSlice"

export const signIn = ({ email, password }) => (dispatch) => {
    axios.post('http://localhost:5500/user/signIn', { email, password })
        .then(response => dispatch(setLoggedIn(response.data.user)));
};
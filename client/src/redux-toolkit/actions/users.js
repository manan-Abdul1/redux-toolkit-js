import { setLoggedIn } from "../features/users/userSlice"
import { apiRequest } from "../../utils/axios";

export const signIn = ({ email, password }) => (dispatch) => {
    apiRequest(`user/signin`, 'post', { email, password })
        .then(response => dispatch(setLoggedIn(response.data.user)));
};

export const createNewUser = async (newUserObj) => apiRequest(`user/createNewUser`, 'post', newUserObj)

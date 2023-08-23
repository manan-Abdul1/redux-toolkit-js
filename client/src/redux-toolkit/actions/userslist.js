import { setLoggedIn } from "../features/users/userSlice"
import { apiRequest } from "../../utils/axios";
import { USER_BASE_URL } from "../../utils/serverUrl";

export const signIn = ({ email, password }) => (dispatch) => {
    apiRequest(`${USER_BASE_URL}/signin`, 'post', { email, password })
    .then(response => 
        {
            
            console.log('res',response.data)
                dispatch(setLoggedIn(response.data.user))
            }
            
            );
};
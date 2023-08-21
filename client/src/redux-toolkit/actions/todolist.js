import { store } from "../app/store";
import axios from "axios";
import { setLoggedIn } from "../features/users/userSlice";
import { addTask, setTodoList } from "../features/todolist/todoSlice";

export const fetchTask = (userId) => (dispatch) => {
    axios.get(`http://localhost:5500/api/tasks?userId=${userId}`, {
        headers: {
            Authorization: `Bearer ${store.getState().users.user.token}`
        }
    }).then(response => dispatch(setTodoList(response.data)))
}

export const createNewTask = (newTaskObj) => (dispatch) => {
    axios.post('http://localhost:5500/api/createNewTask', newTaskObj, {
        headers: {
            Authorization: `Bearer ${store.getState().users.user.token}`
        }
    }).then(response => dispatch(addTask(response.data)));


};

export const signIn = ({ email, password }) => (dispatch) => {
    axios.post('http://localhost:5500/user/signIn', { email, password })
        .then(response => dispatch(setLoggedIn(response.data.user)));
};

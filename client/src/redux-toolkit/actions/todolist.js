import { store } from "../app/store";
import axios from "axios";
import { setLoggedIn } from "../features/users/userSlice";
import { addTask, completedTodoTask, deleteTodoTask, editTodoTask, setTodoList } from "../features/todolist/todoSlice";
import { getToken } from "../../utils/getAuthToken";
export var fetchTasks = (userId) => async (dispatch) => {
    await axios.get(`http://localhost:5500/api/tasks?userId=${userId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }).then(response => dispatch(setTodoList(response.data)))
}

export const createNewTask = (newTaskObj) => async (dispatch) => {
    try {
        await axios.post('http://localhost:5500/api/createNewTask', newTaskObj, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }).then(response => dispatch(addTask(response.data)));
    } catch (error) {
        console.error(error.response.data.error)
    }
};

export const editTask = (editTaskObj, setLoading) => async (dispatch) => {
    try {
        await axios.put("http://localhost:5500/api/editTask", editTaskObj, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }).then((res) => { setLoading(false); dispatch(editTodoTask(res.data)) })
    } catch (error) {
        console.error(error.response.data.error)
    }
};
export const completeTask = (taskId) => async (dispatch) => {
    try {
        await axios.put(
            `http://localhost:5500/api/completedTask?taskId=${taskId}`,
            null,
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            }
        ).then(response => dispatch(completedTodoTask(response.data._id)));
    } catch (error) {
        console.error(error.response.data.error);
    }
};


export const deleteTask = (taskId) => async (dispatch) => {
    try {
        await axios.delete(`http://localhost:5500/api/deleteTask?taskId=${taskId}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }).then(response => dispatch(deleteTodoTask(response.data._id)))
    } catch (error) {
        console.error(error.response.data.error)
    }
};



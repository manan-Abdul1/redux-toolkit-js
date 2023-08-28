import { apiRequest } from "../../utils/axios";
import { addTask, completedTodoTask, deleteTodoTask, editTodoTask, setTodoList } from "../features/todolist/todoSlice";

export const fetchTasks = (userId) => (dispatch) => {
    apiRequest(`api/tasks?userId=${userId}`, 'get', null)
        .then(response => {
            dispatch(setTodoList(response.data))
        });
}
export const createNewTask = (newTaskObj) => (dispatch) => {
    apiRequest(`api/createNewTask`, 'post', newTaskObj)
        .then(response =>
            dispatch(addTask(response.data))
        );
};

export const editTask = (editTaskObj, setLoading) => (dispatch) => {
    apiRequest(`api/editTask`, 'put', editTaskObj)
        .then((res) => {
            setLoading(false);
            dispatch(editTodoTask(res.data))
        });
};
export const completeTask = (taskId, setLoading) => (dispatch) => {
    apiRequest(`api/completedTask?taskId=${taskId}`, 'put', null)
        .then(response => {
            setLoading(false)
            dispatch(completedTodoTask(response.data._id))
        });
};

export const deleteTask = (taskId, setLoading) => async (dispatch) => {
    apiRequest(`api/deleteTask?taskId=${taskId}`, 'delete', null)
        .then(response => {
            setLoading(false)
            dispatch(deleteTodoTask(response.data._id))
        })
};




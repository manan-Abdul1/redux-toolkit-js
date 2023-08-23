import { addTask, completedTodoTask, deleteTodoTask, editTodoTask, setTodoList } from "../features/todolist/todoSlice";
import { apiRequest } from "../../utils/axios";
import { TASK_BASE_URL } from "../../utils/serverUrl";

export const fetchTasks = (userId) => (dispatch) => {
    apiRequest(`${TASK_BASE_URL}tasks?userId=${userId}`, 'get', null)
        .then(response => dispatch(setTodoList(response.data)))
}
export const createNewTask = (newTaskObj) => (dispatch) => {
    apiRequest(`${TASK_BASE_URL}createNewTask`, 'post', newTaskObj)
        .then(response => dispatch(addTask(response.data)));
};

export const editTask = (editTaskObj) => (dispatch) => {
    apiRequest(`${TASK_BASE_URL}editTask`, 'put', editTaskObj)
        .then((res) => {
            // setLoading(false);
            dispatch(editTodoTask(res.data))
        })
};
export const completeTask = (taskId) => (dispatch) => {
    apiRequest(`${TASK_BASE_URL}completedTask?taskId=${taskId}`, 'put', null)
    .then(response => dispatch(completedTodoTask(response.data._id)));
};

export const deleteTask = (taskId) => async (dispatch) => {
    apiRequest(`${TASK_BASE_URL}deleteTask?taskId=${taskId}`, 'delete', null)
    .then(response => dispatch(deleteTodoTask(response.data._id)))
};




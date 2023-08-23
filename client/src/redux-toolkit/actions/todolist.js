import { addTask, completedTodoTask, deleteTodoTask, editTodoTask, setTodoList } from "../features/todolist/todoSlice";
import { apiRequest } from "../../utils/axios";
import { TASK_BASE_URL } from "../../utils/serverUrl";

export const fetchTasks = (userId, setLoading) => (dispatch) => {
    apiRequest(`${TASK_BASE_URL}tasks?userId=${userId}`, 'get', null)
        .then(response => {
            dispatch(setTodoList(response.data))
            setLoading(false)
        });
}
export const createNewTask = (newTaskObj, setLoading) => (dispatch) => {
    apiRequest(`${TASK_BASE_URL}createNewTask`, 'post', newTaskObj)
        .then(response => 
            dispatch(addTask(response.data))
        );
};

export const editTask = (editTaskObj, setLoading) => (dispatch) => {
    apiRequest(`${TASK_BASE_URL}editTask`, 'put', editTaskObj)
        .then((res) => {
            setLoading(false);
            dispatch(editTodoTask(res.data))
        });
};
export const completeTask = (taskId, setLoading) => (dispatch) => {
    apiRequest(`${TASK_BASE_URL}completedTask?taskId=${taskId}`, 'put', null)
        .then(response => {
            setLoading(false)
            dispatch(completedTodoTask(response.data._id))
        });
};

export const deleteTask = (taskId, setLoading) => async (dispatch) => {
    apiRequest(`${TASK_BASE_URL}deleteTask?taskId=${taskId}`, 'delete', null)
        .then(response => {
            setLoading(false)
            dispatch(deleteTodoTask(response.data._id))
        })
};




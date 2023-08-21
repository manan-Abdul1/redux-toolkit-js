import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
// import { getToken } from '../../../utils/getAuthToken';


const initialState = {
    todoList: [],
};



export const createNewTask = createAsyncThunk('todo/createNewTask', async (newTaskObj) => {
    try {
        const response = await axios.post('http://localhost:5500/api/createNewTask', newTaskObj);
        return response.data;
    } catch (error) {
        console.error(error.response.data.error)
    }
});

export const deleteTask = createAsyncThunk('todo/deleteTask', async (taskId) => {
    try {
        const response = await axios.delete(`http://localhost:5500/api/deleteTask?taskId=${taskId}`);
        return response.data.taskId;
    } catch (error) {
        console.error(error.response.data.error)
    }
});

export const completeTask = createAsyncThunk('todo/completeTask', async (taskId) => {
    try {
        const response = await axios.put(`http://localhost:5500/api/completedTask?taskId=${taskId}`);
        return response.data.taskId;
    } catch (error) {
        console.error(error.response.data.error)
    }
});

export const editTask = createAsyncThunk('todo/editTask', async (editTaskObj) => {
    try {
        const response = await axios.put("http://localhost:5500/api/editTask", editTaskObj);
        return response.data;
    } catch (error) {
        console.error(error.response.data.error)
    }
});

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        resetTodoList: (state) => {
            state.todoList = [];
        },
        setTodoList: (state, action)=>{
            state.todoList=action.payload
        },
        addTask: (state, action)=>{
            state.todoList=[...state.todoList, action.payload]
        },
    },
    // reducers: {
    //     addToDo: (state, action) => {
    //         state.todoList.push(action.payload);
    //     },
    //     deleteTodo: (state, action) => {
    //         const taskId = action.payload;
    //         state.todoList = state.todoList.filter(todo => todo.taskId !== taskId);
    //     },
    //     completedTask: (state, action) => {
    //         const taskId= action.payload;
    //         const todo = state.todoList.find(todo => todo.taskId === taskId);
    //         if (todo) {
    //             todo.completed = !todo.completed;
    //         }
    //     },
    //     editTodo: (state, action) => {
    //         const { taskId, description } = action.payload;
    //         const todo = state.todoList.find(todo => todo.taskId === taskId);
    //         if (todo) {
    //             todo.description = description;
    //         }
    //     }
    // },
    // extraReducers: (builder) => {
    //     builder.addCase(fetchTasks.pending, (state) => {
    //         state.loading = true;
    //     });
    //     builder.addCase(fetchTasks.fulfilled, (state, action) => {
    //         state.todoList = action.payload;
    //         state.loading = false;
    //     });
    //     builder.addCase(createNewTask.pending, (state) => {
    //         state.loading = true;
    //     });
    //     builder.addCase(createNewTask.fulfilled, (state, action) => {
    //         state.todoList.push(action.payload);
    //         state.loading = false;
    //     });
    //     builder.addCase(deleteTask.pending, (state) => {
    //         state.loading = true;
    //     })
    //     builder.addCase(deleteTask.fulfilled, (state, action) => {
    //         state.todoList = state.todoList.filter((todo) => todo.taskId !== action.payload);
    //         state.loading = false;
    //     })
    //     builder.addCase(completeTask.pending, (state) => {
    //         state.loading = true;
    //     });
    //     builder.addCase(completeTask.fulfilled, (state, action) => {
    //         const taskId = action.payload;
    //         const todo = state.todoList.find((todo) => todo.taskId === taskId);
    //         if (todo) {
    //             todo.completed = !todo.completed;
    //             state.loading = false;
    //         }
    //     });
    //     builder.addCase(editTask.pending, (state) => {
    //         state.loading = true;
    //     });
    //     builder.addCase(editTask.fulfilled, (state, action) => {
    //         const { taskId, description } = action.payload;
    //         const todo = state.todoList.find((todo) => todo.taskId === taskId);
    //         if (todo) {
    //             todo.description = description;
    //             state.loading = false;
    //         }
    //     });
    // },

});

export const { resetTodoList,setTodoList ,addTask } = todoSlice.actions;
// export const { addToDo, deleteTodo, completedTask, editTodo } = todoSlice.actions;
export default todoSlice.reducer;

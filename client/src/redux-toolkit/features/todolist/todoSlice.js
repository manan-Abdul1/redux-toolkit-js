import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todoList: [],
};

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        resetTodoList: (state) => {
            state.todoList = [];
        },
        setTodoList: (state, action) => {
            state.todoList = action.payload
        },
        addTask: (state, action) => {
            state.todoList = [...state.todoList, action.payload]
        },
        editTodoTask: (state, action) => {
            const { taskId, description } = action.payload;
            const todo = state.todoList.find((todo) => todo.taskId === taskId);
            if (todo) {
                todo.description = description;
                state.loading = false;
            }

        },
        completedTodoTask: (state, action) => {
            const taskId = action.payload;
            const todo = state.todoList.find(todo => todo._id === taskId);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        deleteTodoTask: (state, action) => {
            const taskId = action.payload;
            state.todoList = state.todoList.filter(todo => todo._id !== taskId);
        }
    }

});

export const { resetTodoList, setTodoList, addTask, editTodoTask, completedTodoTask, deleteTodoTask } = todoSlice.actions;
export default todoSlice.reducer;

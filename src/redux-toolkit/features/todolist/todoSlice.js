import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todoList: []
};

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addToDo: (state, action) => {
            state.todoList.push(action.payload);
        },
        deleteTodo: (state, action) => {
            const taskId = action.payload;
            state.todoList = state.todoList.filter(todo => todo.taskId !== taskId);
        },
        completedTask: (state, action) => {
            const taskId= action.payload;
            const todo = state.todoList.find(todo => todo.taskId === taskId);
            if (todo) {
                todo.completed = !todo.completed;
            }
        }
    },
});

export const { addToDo, deleteTodo, completedTask } = todoSlice.actions;
export default todoSlice.reducer;

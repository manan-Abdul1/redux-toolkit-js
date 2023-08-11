import { createSlice } from '@reduxjs/toolkit'
const toDoSlice = createSlice({
    name: 'toDo',
    initialState: {
        todoList: []
    },
    reducers: {
        addToDo: (state, action) => {

        }
        ,
        deleteToDo: (state, action) => {
        },
        editTodo: (state, action) => {
        }
    },
})
export const { addToDo, deleteToDo, editTodo } = toDoSlice.actions
export default toDoSlice.reducer;
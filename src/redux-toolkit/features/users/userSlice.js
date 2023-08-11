import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    usersData: [],
    isLoggedIn: false,
    SignedInCredentials: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        register: (state, action) => {
            state.usersData = [...state.usersData, { ...action.payload, todos: [] }]
            state.isLoggedIn = false
        },
        signIn: (state, action) => {
            state.SignedInCredentials = action.payload
            state.isLoggedIn = true
        },
        logout: (state, action) => {
            state.SignedInCredentials = []
            state.isLoggedIn = false
        },
        addToDo: (state, action) => {
            const { email, todos } = action.payload;
            const user = state.usersData.find(user => user.email === email);
            if (user) {
                user.todos = todos;
            }
        },
        deleteTodo: (state, action) => {
            const { email, taskId } = action.payload;
            const user = state.usersData.find(user => user.email === email);

            if (user) {
                user.todos = user.todos.filter(todo => todo.id !== taskId);
            }
        },
        completedTask: (state, action) => {
            const { email, taskId } = action.payload;
            const user = state.usersData.find(user => user.email === email);
            if (user) {
                const todo = user.todos.find(todo => todo.id === taskId);
                console.log(todo.completed,'da')
                if (todo) {
                    todo.completed = !todo.completed;
                }
            }
        }
    }
})
export const { register, logout, signIn, addToDo, deleteTodo, completedTask } = userSlice.actions

export default userSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    usersData: [],
    isLoggedIn: false,
    loggedInUser: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        register: (state, action) => {
            state.usersData = [...state.usersData, { ...action.payload }]
            state.isLoggedIn = false
        },
        signIn: (state, action) => {
            state.loggedInUser = action.payload
            state.isLoggedIn = true
        },
        logout: (state) => {
            state.loggedInUser = null
            state.isLoggedIn = false
        },
        // addToDo: (state, action) => {
        //     const { userId, todos } = action.payload;
        //     const user = state.usersData.find(user => user.userId === userId);
        //     if (user) {
        //         user.todos = todos;
        //     }
        // },
        // deleteTodo: (state, action) => {
        //     const { userId, taskId } = action.payload;
        //     const user = state.usersData.find(user => user.userId === userId);
        //     if (user) {
        //         user.todos = user.todos.filter(todo => todo.taskId !== taskId);
        //     }
        // },
        // completedTask: (state, action) => {
        //     const { userId, taskId } = action.payload;
        //     const user = state.usersData.find(user => user.userId === userId);
        //     if (user) {
        //         const todo = user.todos.find(todo => todo.taskId === taskId);
        //         console.log(todo.completed,'da')
        //         if (todo) {
        //             todo.completed = !todo.completed;
        //         }
        //     }
        // }
    }
})
// export const { register, logout, signIn, addToDo, deleteTodo, completedTask } = userSlice.actions
export const { register, logout, signIn } = userSlice.actions

export default userSlice.reducer
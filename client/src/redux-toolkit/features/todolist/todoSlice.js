import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todoList: [],
    // loading: false
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
            const todo = state.todoList.find(todo => todo.taskId === taskId);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        deleteTodoTask: (state, action) => {
            const taskId = action.payload;
            state.todoList = state.todoList.filter(todo => todo.taskId !== taskId);
        },

    },
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

export const { resetTodoList, setTodoList, addTask, editTodoTask, completedTodoTask, deleteTodoTask } = todoSlice.actions;
// export const { addToDo, deleteTodo, completedTask, editTodo } = todoSlice.actions;
export default todoSlice.reducer;

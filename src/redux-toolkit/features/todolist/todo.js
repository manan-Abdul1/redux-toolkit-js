const initialState = {
    usersData: [],
    isLoggedIn: false,
    loggedInUser: null,
  };
  
  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      // ... other reducers
  
      addTodo: (state, action) => {
        const { username, task } = action.payload;
        const user = state.usersData.find(user => user.username === username);
        if (user) {
          user.todos.push({ task, completed: false });
        }
      },
  
      toggleTodo: (state, action) => {
        const { username, taskId } = action.payload;
        const user = state.usersData.find(user => user.username === username);
        if (user) {
          const todo = user.todos.find(todo => todo.id === taskId);
          if (todo) {
            todo.completed = !todo.completed;
          }
        }
      },
  
      deleteTodo: (state, action) => {
        const { username, taskId } = action.payload;
        const user = state.usersData.find(user => user.username === username);
        if (user) {
          user.todos = user.todos.filter(todo => todo.id !== taskId);
        }
      },
    },
  });
  
  export const { register, logout, signIn, addTodo, toggleTodo, deleteTodo } = userSlice.actions;
  
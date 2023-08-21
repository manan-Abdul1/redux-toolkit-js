import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // You can use 'localStorage' or 'sessionStorage'
import usersReducer from "../features/users/userSlice";
import todoReducer from "../features/todolist/todoSlice";

const persistConfig = {
  key: 'root', // Key for storage
  storage, // Storage medium to use (localStorage, sessionStorage, etc.)
  // You can also blacklist or whitelist certain reducers if needed
};
const userPersistedReducer = persistReducer(persistConfig, usersReducer);

const store = configureStore({
  reducer: {
    users: userPersistedReducer,
    todo: todoReducer
  },
  middleware: getDefaultMiddleware({serializableCheck: false})
});

const persistor = persistStore(store);

export { store, persistor };

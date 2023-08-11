import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // You can use 'localStorage' or 'sessionStorage'
import usersReducer from "../features/users/userSlice";

const persistConfig = {
  key: 'root', // Key for storage
  storage, // Storage medium to use (localStorage, sessionStorage, etc.)
  // You can also blacklist or whitelist certain reducers if needed
  blacklist: [], // Reducers you don't want to persist
};

const persistedReducer = persistReducer(persistConfig, usersReducer);

const store = configureStore({
  reducer: {
    users: persistedReducer, // Use the persisted reducer
  },
});

const persistor = persistStore(store);

export { store, persistor };

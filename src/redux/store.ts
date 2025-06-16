// src/redux/store.ts

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import headReducer from "./slice/HeaderSlice";
import authReducer from "./slice/AuthSlice";
import userProfileReducer from "./slice/UserProfileSlice";
import petProfileReducer from "./slice/PetProfileSlice";

const persistConfig = {
  key: "root", 
  storage, 
};

// Combine your reducers
const rootReducer = combineReducers({
  auth: authReducer,
  header: headReducer,
  userProfile: userProfileReducer,
  petProfile: petProfileReducer,
});

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // Ignore these actions to avoid warnings
      },
    }),
});

// Create a persistor
export const persistor = persistStore(store);

// Type definitions for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

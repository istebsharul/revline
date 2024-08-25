import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import authReducer from '../Reducers/userReducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'user',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer, // Auth state persistence
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Ignore specific persist actions
      },
    }).concat(thunk), // Ensure thunk is correctly concatenated
});

export const persistor = persistStore(store);
export default store;
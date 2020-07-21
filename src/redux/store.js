import { configureStore } from '@reduxjs/toolkit';
import phonebookReducer from './phonebook-reducer';

const store = configureStore({
  reducer: {
    contacts: phonebookReducer,
  },
});

export default store;

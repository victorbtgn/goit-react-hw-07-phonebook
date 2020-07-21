import { v4 as uuidv4 } from 'uuid';
import { createAction } from '@reduxjs/toolkit';

const addContact = createAction('phonebook/add', (name, number) => ({
  payload: {
    id: uuidv4(),
    name,
    number,
  },
}));

const deleteContact = createAction('phonebook/delete');
const changeFilter = createAction('phonebook/changeFilter');

export default { addContact, deleteContact, changeFilter };

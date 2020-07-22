import { createAction } from '@reduxjs/toolkit';

export const fetchContactsRequest = createAction('contacts/fetchContactsRequest');
export const fetchContactsSuccess = createAction('contacts/fetchContactsSuccess');
export const fetchContactsError = createAction('contacts/fetchContactsError');

export const addContactsRequest = createAction('contacts/addContactRequest');
export const addContactsSuccess = createAction('contacts/addContactSuccess');
export const addContactsError = createAction('contacts/addContactError');

export const deleteContactsRequest = createAction('contacts/deleteContactRequest');
export const deleteContactsSuccess = createAction('contacts/deleteContactSuccess');
export const deleteContactsError = createAction('contacts/deleteContactError');

export const changeFilter = createAction('contacts/changeFilter');

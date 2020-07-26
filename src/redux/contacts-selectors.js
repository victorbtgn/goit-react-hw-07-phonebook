import { createSelector } from '@reduxjs/toolkit';

const getAllContacts = state => state.contacts.items;
const getContactsLength = state => state.contacts.items.length;
const getFilter = state => state.contacts.filter;
const getError = state => state.contacts.error;
const getLoading = state => state.contacts.loading;

const getVisibleContacts = createSelector([getAllContacts, getFilter], (contacts, filter) => {
  const normalizeFilter = filter.toLowerCase();

  return contacts.filter(contact => contact.name.toLowerCase().includes(normalizeFilter));
});

export default {
  getAllContacts,
  getFilter,
  getContactsLength,
  getError,
  getLoading,
  getVisibleContacts,
};

import React from 'react';
import ContactItem from './ContactItem';
import { connect } from 'react-redux';
import phonebookAction from '../../redux/phonebook-action';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, onDelete }) => (
  <ul className="list">
    {contacts.map(({ id, name, number }) => (
      <ContactItem
        key={id}
        id={id}
        name={name}
        number={number}
        onDelete={() => onDelete(id)}
      />
    ))}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const getVisibleContacts = (allContacts, filter) => {
  const normalizeFilter = filter.toLowerCase();
  // const sortContactsByName = allContacts

  return allContacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizeFilter),
  );
};

const mapStateToProps = ({ contacts }) => ({
  contacts: getVisibleContacts(contacts.items, contacts.filter),
});

const mapDispatchToProps = dispatch => ({
  onDelete: id => dispatch(phonebookAction.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);

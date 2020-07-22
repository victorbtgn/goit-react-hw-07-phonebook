import React, { Component } from 'react';
import ContactItem from './ContactItem';
import { connect } from 'react-redux';
import contactsOperations from '../../redux/contacts-operations';
import PropTypes from 'prop-types';

class ContactList extends Component {
  componentDidMount() {
    this.props.fetchContacts();
  }
  render() {
    return (
      <ul className="list">
        {this.props.contacts.map(({ id, name, number }) => (
          <ContactItem key={id} id={id} name={name} number={number} onDelete={() => this.props.onDelete(id)} />
        ))}
      </ul>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const getVisibleContacts = (allContacts, filter) => {
  const normalizeFilter = filter.toLowerCase();

  return allContacts.filter(contact => contact.name.toLowerCase().includes(normalizeFilter));
};

const mapStateToProps = ({ contacts }) => ({
  contacts: getVisibleContacts(contacts.items, contacts.filter),
});

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(contactsOperations.fetchContacts()),
  onDelete: id => dispatch(contactsOperations.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);

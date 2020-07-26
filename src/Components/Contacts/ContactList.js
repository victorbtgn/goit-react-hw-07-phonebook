import React, { Component } from 'react';
import ContactItem from './ContactItem';
import { connect } from 'react-redux';
import contactsOperations from '../../redux/contacts-operations';
import contactSelectors from '../../redux/contacts-selectors';
import PropTypes from 'prop-types';

class ContactList extends Component {
  componentDidMount() {
    this.props.fetchContacts();
  }
  render() {
    return (
      <>
        <ul className="list">
          {this.props.contacts.map(({ id, name, number }) => (
            <ContactItem key={id} id={id} name={name} number={number} onDelete={() => this.props.onDelete(id)} />
          ))}
        </ul>

        {this.props.error && (
          <>
            <p className="errorMessage">{this.props.error}</p>
            <p className="errorMessage">The server is temporarily unavailable, try again later.</p>
          </>
        )}
      </>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  contacts: contactSelectors.getVisibleContacts(state),
  error: contactSelectors.getError(state),
});

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(contactsOperations.fetchContacts()),
  onDelete: id => dispatch(contactsOperations.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);

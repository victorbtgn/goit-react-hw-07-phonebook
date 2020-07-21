import React, { Component } from 'react';
import { connect } from 'react-redux';
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import phonebookAction from '../../redux/phonebook-action';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  inputChange = ({ currentTarget: { name, value } }) => {
    this.setState({ [name]: value });
  };

  createContact = evt => {
    evt.preventDefault();
    const { name, number } = this.state;

    const isExist = this.props.items.find(item => item.name === name);

    if (isExist) {
      toaster.notify(`${name} is already in contacts.`, {
        duration: 5000,
      });
      return;
    }

    if (!name || !number) {
      toaster.notify('Please fill the form', {
        duration: 5000,
      });
      return;
    }

    if (number.length < 7 || number.length > 7) {
      toaster.notify('Please fill the correct number: 12-34-567', {
        duration: 5000,
      });
      return;
    }

    this.props.onSubmit(this.state);

    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.createContact}>
        <label>
          Name *
          <br />
          <input
            type="text"
            name="name"
            value={name}
            className="input"
            onChange={this.inputChange}
          />
        </label>
        <br />
        <label>
          Phone number *
          <br />
          <input
            type="number"
            name="number"
            value={number}
            className="input"
            onChange={this.inputChange}
          />
        </label>
        <br />
        <button className="btn" type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

const mapStateToProps = ({ contacts }) => ({
  items: contacts.items,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: contact =>
    dispatch(phonebookAction.addContact(contact.name, contact.number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);

import React from 'react';
import { connect } from 'react-redux';
import phonebookAction from '../../redux/phonebook-action';
import PropTypes from 'prop-types';

const Filter = ({ filter, contactsLength, onChange }) => (
  <>
    {contactsLength > 1 && (
      <label>
        Find contacts by name
        <br />
        <input
          type="text"
          name="filter"
          value={filter}
          className="input"
          onChange={onChange}
        />
      </label>
    )}
  </>
);

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  contactsLength: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = ({ contacts }) => ({
  filter: contacts.filter,
  contactsLength: contacts.items.length,
});

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(phonebookAction.changeFilter(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

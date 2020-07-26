import React from 'react';
import { connect } from 'react-redux';
import { changeFilter } from '../../redux/contacts-action';
import contactSelectors from '../../redux/contacts-selectors';
import PropTypes from 'prop-types';

const Filter = ({ filter, contactsLength, onChange }) => (
  <>
    {contactsLength > 1 && (
      <label>
        Find contacts by name
        <br />
        <input type="text" name="filter" value={filter} className="input" onChange={onChange} />
      </label>
    )}
  </>
);

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  contactsLength: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  filter: contactSelectors.getFilter(state),
  contactsLength: contactSelectors.getContactsLength(state),
});

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(changeFilter(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

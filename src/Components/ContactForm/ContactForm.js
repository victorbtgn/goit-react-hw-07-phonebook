// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import toaster from 'toasted-notes';
// import 'toasted-notes/src/styles.css';
// import contactsOperations from '../../redux/contacts-operations';
// import contactSelectors from '../../redux/contacts-selectors';

// class ContactForm extends Component {
//   state = {
//     name: '',
//     number: '',
//   };

//   inputChange = ({ currentTarget: { name, value } }) => {
//     this.setState({ [name]: value });
//   };

//   createContact = evt => {
//     evt.preventDefault();
//     const { name, number } = this.state;

//     const isExist = this.props.items.find(item => item.name === name);

//     if (isExist) {
//       toaster.notify(`${name} is already in contacts.`, {
//         duration: 5000,
//       });
//       return;
//     }

//     if (!name || !number) {
//       toaster.notify('Please fill the form', {
//         duration: 5000,
//       });
//       return;
//     }

//     if (number.length < 7 || number.length > 7) {
//       toaster.notify('Please fill the correct number: 12-34-567', {
//         duration: 5000,
//       });
//       return;
//     }

//     this.props.onSubmit(this.state);

//     this.reset();
//   };

//   reset = () => {
//     this.setState({ name: '', number: '' });
//   };

//   render() {
//     const { name, number } = this.state;

//     return (
//       <form onSubmit={this.createContact}>
//         <label>
//           Name *
//           <br />
//           <input type="text" name="name" value={name} className="input" onChange={this.inputChange} />
//         </label>
//         <br />
//         <label>
//           Phone number *
//           <br />
//           <input type="number" name="number" value={number} className="input" onChange={this.inputChange} />
//         </label>
//         <br />
//         <button className="btn" type="submit">
//           Add contact
//         </button>
//       </form>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   items: contactSelectors.getAllContacts(state),
// });

// const mapDispatchToProps = dispatch => ({
//   onSubmit: contact => dispatch(contactsOperations.addContact(contact.name, contact.number)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);

// ===========================================================================================================

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { connect } from 'react-redux';
import contactsOperations from '../../redux/contacts-operations';
import contactSelectors from '../../redux/contacts-selectors';

const ContactForm = ({ items, onSubmit }) => (
  <>
    <Formik
      initialValues={{ name: '', number: '' }}
      validate={values => {
        const errors = {};
        const isExist = items.find(item => item.name === values.name);

        if (isExist) {
          errors.name = `${values.name} is already in contacts.`;
        } else if (!values.name) {
          errors.name = 'Required';
        } else if (!values.number) {
          errors.number = 'Required';
        } else if (values.number.length !== 7) {
          errors.number = 'Please fill the correct number: 12-34-567';
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        onSubmit(values);
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="input-form">
            <Field type="text" name="name" className="input" />
            <ErrorMessage name="name" component="div" className="input-error" />
          </div>
          <div className="input-form">
            <Field type="tel" name="number" className="input" />
            <ErrorMessage name="number" component="div" className="input-error" />
          </div>
          <button type="submit" disabled={isSubmitting} className="btn">
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  </>
);

const mapStateToProps = state => ({
  items: contactSelectors.getAllContacts(state),
});

const mapDispatchToProps = dispatch => ({
  onSubmit: contact => dispatch(contactsOperations.addContact(contact.name, contact.number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);

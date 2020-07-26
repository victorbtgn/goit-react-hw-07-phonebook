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

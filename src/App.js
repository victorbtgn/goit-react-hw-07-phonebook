import React from 'react';
import { connect } from 'react-redux';
import Container from './Common/Container';
import ContactForm from './Components/ContactForm/ContactForm';
import Filter from './Components/Filter/Filter';
import ContactList from './Components/Contacts/ContactList';
import Section from './Common/Section';
import contactSelectors from './redux/contacts-selectors';
import 'toasted-notes/src/styles.css';
import './App.css';

const App = ({ error }) => (
  <Container>
    {error && (
      <>
        <h1 className="errorMessage">{error}</h1>
        <p className="errorMessage">The server is temporarily unavailable, try again later.</p>
      </>
    )}

    {!error && (
      <>
        <Section title="Phonebook">
          <ContactForm />
        </Section>

        <Section title="Contacts">
          <Filter />

          <ContactList />
        </Section>
      </>
    )}
  </Container>
);

const mapStateToProps = state => ({
  error: contactSelectors.getError(state),
});

export default connect(mapStateToProps)(App);

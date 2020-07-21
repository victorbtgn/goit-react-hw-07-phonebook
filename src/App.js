import React from 'react';
import Container from './Common/Container';
import ContactForm from './Components/ContactForm/ContactForm';
import Filter from './Components/Filter/Filter';
import ContactList from './Components/Contacts/ContactList';
import Section from './Common/Section';
import 'toasted-notes/src/styles.css';
import './App.css';

const App = () => (
  <Container>
    <Section title="Phonebook">
      <ContactForm />
    </Section>

    <Section title="Contacts">
      <Filter />

      <ContactList />
    </Section>
  </Container>
);

export default App;

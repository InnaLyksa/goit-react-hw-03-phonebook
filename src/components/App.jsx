import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContactList, ContactForm, Filter } from 'components';
import { Container, SectionHeader, PageHeader } from './App.styled';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/localStorage';

const KEY_CONTACTS = 'contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    this.setState({ contacts: getFromLocalStorage(KEY_CONTACTS) });
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      saveToLocalStorage(KEY_CONTACTS, this.state.contacts);
    }
  }

  addContact = (newName, newNumber) => {
    const newContact = {
      id: nanoid(),
      name: newName,
      number: newNumber,
    };

    const { name, number } = newContact;

    if (this.checkedDublicateName(name)) {
      toast.warn(`${name} is already in contacts`, {
        position: 'top-center',
        autoClose: 2000,
        theme: 'colored',
      });
    } else if (this.checkedDublicateNumber(number)) {
      toast.warn(`${number} is already in contacts`, {
        position: 'top-center',
        autoClose: 2000,
        theme: 'colored',
      });
    } else {
      this.setState(({ contacts }) => ({
        contacts: [newContact, ...contacts],
      }));
    }
  };

  checkedDublicateNumber = dublicateNumber =>
    this.state.contacts.find(contact => contact.number === dublicateNumber);

  checkedDublicateName = dublicateName =>
    this.state.contacts.find(
      contact => contact.name.toLowerCase() === dublicateName.toLowerCase()
    );

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return filteredContacts;
  };

  render() {
    const {
      state,
      addContact,
      deleteContact,
      changeFilter,
      getFilteredContacts,
    } = this;
    return (
      <Container>
        <PageHeader>Phonebook</PageHeader>
        <ContactForm onSubmit={addContact} />
        <SectionHeader>Contacts</SectionHeader>
        <Filter value={state.filter} onChange={changeFilter} />
        <ContactList
          contacts={getFilteredContacts()}
          deleteContact={deleteContact}
        />
        <ToastContainer />
      </Container>
    );
  }
}

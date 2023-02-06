import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactList, ContactForm, Filter } from 'components';
import { Container, SectionHeader, PageHeader } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = (newName, newNumber) => {
    // console.log(newName, newNumber);
    const newContact = {
      id: nanoid(),
      name: newName,
      number: newNumber,
    };

    // const { name } = newContact;

    // this.checkedDublicateName(name)
    //   ? alert(`${name}  is already in contacts`)
    //   : this.setState(({ contacts }) => ({
    //       contacts: [newContact, ...contacts],
    //     }));

    const { name, number } = newContact;

    if (this.checkedDublicateName(name)) {
      alert(`${name}  is already in contacts`);
    } else if (this.checkedDublicateNumber(number)) {
      alert(` ${number} is already in contacts`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [newContact, ...contacts],
      }));
    }

    // this.checkedDublicateName(name) || this.checkedDublicateNumber(number)
    //   ? alert(`${name} or ${number} is already in contacts`)
    //   : this.setState(({ contacts }) => ({
    //       contacts: [newContact, ...contacts],
    //     }));
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
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
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
      </Container>
    );
  }
}

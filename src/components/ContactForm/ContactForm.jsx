import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import {
  FormAddContact,
  LabelContactForm,
  InputContactForm,
  ButtonSubmit,
} from './ContactForm.styled';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  _nameInputId = nanoid();
  _numberInputId = nanoid();

  handelInputChange = event => {
    const { name, value } = event.currentTarget;
    // console.log(event.currentTarget.value);
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { state, props, resetForm } = this;
    const { name, number } = state;

    // console.log(state);
    props.onSubmit(name, number);
    resetForm();
  };

  resetForm = () =>
    this.setState({
      name: '',
      number: '',
    });

  render() {
    return (
      <FormAddContact onSubmit={this.handleSubmit}>
        <LabelContactForm htmlFor={this._nameInputId}>Name</LabelContactForm>
        <InputContactForm
          id={this._nameInputId}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={this.state.name}
          onChange={this.handelInputChange}
        />

        <LabelContactForm htmlFor={this._numberInputId}>
          Number
        </LabelContactForm>
        <InputContactForm
          id={this._numberInputId}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={this.state.number}
          onChange={this.handelInputChange}
        />

        <ButtonSubmit type={'submit'}>Add contact</ButtonSubmit>
      </FormAddContact>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

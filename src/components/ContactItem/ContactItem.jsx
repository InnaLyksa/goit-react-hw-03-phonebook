import PropTypes from 'prop-types';
import { ReactComponent as Phone } from '../../icons/phone.svg';
import { ContactListItem, ContactText, DeleteBtn } from './ContactItem.styled';

export const ContactItem = ({ id, name, number, onDeleteContact }) => {
  return (
    <ContactListItem>
      <ContactText href={`tel:${number}`}>
        <Phone />
        {name}: {number}
      </ContactText>

      <DeleteBtn type={'button'} onClick={() => onDeleteContact(id)}>
        Delete
      </DeleteBtn>
    </ContactListItem>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

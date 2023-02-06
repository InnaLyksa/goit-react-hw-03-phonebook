import PropTypes from 'prop-types';
import { ContactListItem, ContactText, DeleteBtn } from './ContactItem.styled';

export const ContactItem = ({ id, name, number, onDeleteContact }) => {
  return (
    <ContactListItem>
      <ContactText>
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

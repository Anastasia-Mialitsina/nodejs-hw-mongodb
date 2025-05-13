// src/controllers/contactsController.js
import { getAllContacts, getContactByIdService } from '../services/contacts.js';

export const getContacts = async (req, res) => {
  try {
     console.log('Received request to fetch all contacts');
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    console.error('Error in getContacts:', error);
    res.status(500).json({
      status: 500,
      message: 'Error retrieving contacts',
    });
  }
};

export const getContactById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactByIdService(contactId);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    console.error('Error in getContactById:', error);
    res.status(500).json({
      status: 500,
      message: 'Error retrieving contact by ID',
    });
  }
};

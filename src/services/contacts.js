// src/services/contacts.js
import Contact from '../models/contact.js';

export const getAllContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    console.error('Error in getAllContacts:', error);
    throw new Error('Error retrieving contacts');
  }
};

export const getContactByIdService = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (error) {
    console.error('Error in getContactByIdService:', error);
    throw new Error('Error retrieving contact by ID');
  }
};

// src/services/contacts.js
import Contact from '../models/contactModel.js';

export const getAllContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    console.error('Error in getAllContacts:', error);
    throw new Error('Error retrieving contacts');
  }
};

export const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (error) {
    console.error('Error in getContactByIdService:', error);
    throw new Error('Error retrieving contact by ID');
  }
};

export const addContact = async (contactData) => {
  try {
    const newContact = await Contact.create(contactData);
    return newContact;
  } catch (error) {
    console.error('Error in addContact:', error);
    throw new Error('Error creating new contact');
  }
};

export const patchContact = async (contactId, updateData) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, updateData, {
      new: true,
      runValidators: true,
    });
    return updatedContact;
  } catch (error) {
    console.error('Error in patchContact:', error);
    throw new Error('Error patching contact');
  }
};



export const deleteContact = async (contactId) => {
  try {
    const deleted = await Contact.findByIdAndDelete(contactId);
    return deleted;
  } catch (error) {
    console.error('Error in deleteContact:', error);
    throw new Error('Error deleting contact');
  }
};

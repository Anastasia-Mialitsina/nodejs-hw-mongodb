// src/controllers/contactsController.js
//import * as contactsOperations from '../models/contactModel.js';
import * as contactsService from '../services/contacts.js';
import createError from 'http-errors';

export const getAllContacts = async (req, res) => {
  const contacts = await contactsService.getAllContacts();
  res.json({ status: 'success', code: 200, data: { contacts } });
};

export const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsService.getContactByIdService(contactId);
  if (!contact) {
    throw createError(404, 'Contact not found');
  }
  res.json({ status: 'success', code: 200, data: { contact } });
};

export const addContact = async (req, res) => {
  const newContact = await contactsService.addContact(req.body);
  res.status(201).json({ status: 'success', code: 201, data: { newContact } });
};

export const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.deleteContact(contactId);

  if (!result) {
    throw createError(404, 'Contact not found');
  }

  res.status(204).send();
};

export const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const updated = await contactsService.updateContact(contactId, req.body);
  if (!updated) {
    throw createError(404, 'Contact not found');
  }
  res.json({ status: 'success', code: 200, data: { updated } });
};

export const createContact = async (req, res) => {
  const { name, phoneNumber, contactType } = req.body;

  if (!name || !phoneNumber || !contactType) {
    throw createError(
      400,
      'Missing required fields: name, phoneNumber, contactType'
    );
  }

  const newContact = await contactsService.addContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const patchContactById = async (req, res) => {
  const { contactId } = req.params;

  const updatedContact = await contactsService.patchContact(
    contactId,
    req.body
  );

  if (!updatedContact) {
    throw createError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};

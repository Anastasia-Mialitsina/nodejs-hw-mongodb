// src/controllers/contactsController.js
import * as contactsService from '../services/contacts.js';
import createError from 'http-errors';

export const getAllContacts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const sortBy = req.query.sortBy || 'name';
  const sortOrder = req.query.sortOrder || 'asc';
  const type = req.query.type;
  const isFavourite = req.query.isFavourite;

  const contacts = await contactsService.getAllContacts(
    req.user._id,
    page,
    perPage,
    sortBy,
    sortOrder,
    type,
    isFavourite
  );

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const contact = await contactsService.getContactById(contactId, req.user._id);

  if (!contact) {
    throw createError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: 'Success',
    data: contact,
  });
};

export const addContact = async (req, res) => {
  
  const contactData = { ...req.body, userId: req.user._id };
  const newContact = await contactsService.addContact(contactData);

  res.status(201).json({
    status: 201,
    message: 'Contact created',
    data: newContact,
  });
};

export const deleteContactById = async (req, res) => {
  const { contactId } = req.params;

  const result = await contactsService.deleteContact(contactId, req.user._id);

  if (!result) {
    throw createError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Contact deleted',
    data: null,
  });
};

export const updateContactById = async (req, res) => {
  const { contactId } = req.params;

  const updated = await contactsService.updateContact(
    contactId,
    req.body,
    req.user._id
  );

  if (!updated) {
    throw createError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: 'Contact updated',
    data: updated,
  });
};

export const createContact = async (req, res) => {
  const { name, phoneNumber, contactType } = req.body;

  if (!name || !phoneNumber || !contactType) {
    throw createError(
      400,
      'Missing required fields: name, phoneNumber, contactType'
    );
  }

  const contactData = { ...req.body, userId: req.user._id };
  const newContact = await contactsService.addContact(contactData);

  res.status(201).json({
    status: 201,
    message: 'Contact created',
    data: newContact,
  });
};

export const patchContactById = async (req, res) => {
  const { contactId } = req.params;

  
  const updatedContact = await contactsService.patchContact(
    contactId,
    req.body,
    req.user._id
  );

  if (!updatedContact) {
    throw createError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Contact patched',
    data: updatedContact,
  });
};

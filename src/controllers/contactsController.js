// src/controllers/contactsController.js
import * as contactsService from '../services/contacts.js';
import createError from 'http-errors';
import { uploadImage } from '../services/cloudinary.js';

export const getAllContacts = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(createError(error.status || 500, error.message));
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await contactsService.getContactById(
      contactId,
      req.user._id
    );

    if (!contact) {
      return next(createError(404, 'Contact not found'));
    }

    res.status(200).json({
      status: 200,
      message: 'Success',
      data: contact,
    });
  } catch (error) {
    next(createError(error.status || 500, error.message));
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { name, phoneNumber, contactType } = req.body;

    if (!name || !phoneNumber || !contactType) {
      return next(
        createError(
          400,
          'Missing required fields: name, phoneNumber, contactType'
        )
      );
    }

    let photoUrl = '';
    if (req.file) {
      photoUrl = await uploadImage(req.file.buffer);
    }

    const contactData = {
      ...req.body,
      userId: req.user._id,
      photo: photoUrl,
    };

    const newContact = await contactsService.addContact(contactData);

    res.status(201).json({
      status: 201,
      message: 'Contact created',
      data: newContact,
    });
  } catch (error) {
    next(createError(error.status || 500, error.message));
  }
};



export const deleteContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await contactsService.deleteContact(contactId, req.user._id);

    if (!result) {
      return next(createError(404, 'Contact not found'));
    }

    res.status(200).json({
      status: 200,
      message: 'Contact deleted',
      data: null,
    });
  } catch (error) {
    next(createError(error.status || 500, error.message));
  }
};

export const updateContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const updated = await contactsService.updateContact(
      contactId,
      req.body,
      req.user._id
    );

    if (!updated) {
      return next(createError(404, 'Contact not found'));
    }

    res.status(200).json({
      status: 200,
      message: 'Contact updated',
      data: updated,
    });
  } catch (error) {
    next(createError(error.status || 500, error.message));
  }
};

export const patchContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    let updates = { ...req.body };

    if (req.file) {
      const photoUrl = await uploadImage(req.file.buffer);
      updates.photo = photoUrl;
    }

    const updatedContact = await contactsService.patchContact(
      contactId,
      updates,
      req.user._id
    );

    if (!updatedContact) {
      return next(createError(404, 'Contact not found'));
    }

    res.status(200).json({
      status: 200,
      message: 'Contact patched',
      data: updatedContact,
    });
  } catch (error) {
    next(createError(error.status || 500, error.message));
  }
};

// src/services/contacts.js
import Contact from '../models/contactModel.js';

 export const getAllContacts = async (
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = 'asc',
  type,
  isFavourite
) => {
  try {
    const skip = (page - 1) * perPage;

    const filter = {};
    if (type) filter.contactType = type;
    if (isFavourite !== undefined) filter.isFavourite = isFavourite === 'true';

    const totalItems = await Contact.countDocuments(filter);
    const sortDirection = sortOrder === 'desc' ? -1 : 1;
    const sortOptions = { [sortBy]: sortDirection };

    const contacts = await Contact.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(perPage);

    const totalPages = Math.ceil(totalItems / perPage);

    return {
      data: contacts,
      page,
      perPage,
      totalItems,
      totalPages,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
    };
  } catch (error) {
    console.error('Error in getAllContacts:', error);
    throw new Error('Error retrieving contacts');
  }
};

 export const addContact = async (contactData) => {
  try {
    const newContact = new Contact(contactData);
    await newContact.save();
    return newContact;
  } catch (error) {
    console.error('Error in addContact:', error);
    throw new Error('Error creating contact');
  }
};

 export const getContactById = async (id) => {
  try {
    const contact = await Contact.findById(id);
    return contact;
  } catch (error) {
    console.error('Error in getContactById:', error);
    throw new Error('Error retrieving contact');
  }
};

 export const updateContact = async (id, updatedData) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    return updatedContact;
  } catch (error) {
    console.error('Error in updateContact:', error);
    throw new Error('Error updating contact');
  }
};

 export const patchContact = async (id, updatedFields) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    });
    return updatedContact;
  } catch (error) {
    console.error('Error in patchContact:', error);
    throw new Error('Error patching contact');
  }
};

 export const deleteContact = async (id) => {
  try {
    const deleted = await Contact.findByIdAndDelete(id);
    return deleted;
  } catch (error) {
    console.error('Error in deleteContact:', error);
    throw new Error('Error deleting contact');
  }
};


// src/services/contacts.js
import Contact from '../models/contactModel.js';

export const getAllContacts = async (
  userId, 
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = 'asc',
  type,
  isFavourite
) => {
  try {
    const skip = (page - 1) * perPage;

    const filter = { userId }; 
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

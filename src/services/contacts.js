// // src/services/contacts.js
// import Contact from '../models/contactModel.js';

// export const getAllContacts = async (
//   userId, 
//   page = 1,
//   perPage = 10,
//   sortBy = 'name',
//   sortOrder = 'asc',
//   type,
//   isFavourite
// ) => {
//   try {
//     const skip = (page - 1) * perPage;

//     const filter = { userId }; 
//     if (type) filter.contactType = type;
//     if (isFavourite !== undefined) filter.isFavourite = isFavourite === 'true';

//     const totalItems = await Contact.countDocuments(filter);

//     const sortDirection = sortOrder === 'desc' ? -1 : 1;
//     const sortOptions = { [sortBy]: sortDirection };

//     const contacts = await Contact.find(filter) 
//       .sort(sortOptions)
//       .skip(skip)
//       .limit(perPage);

//     const totalPages = Math.ceil(totalItems / perPage);

//     return {
//       data: contacts,
//       page,
//       perPage,
//       totalItems,
//       totalPages,
//       hasPreviousPage: page > 1,
//       hasNextPage: page < totalPages,
//     };
//   } catch (error) {
//     console.error('Error in getAllContacts:', error);
//     throw new Error('Error retrieving contacts');
//   }
// };


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
  const skip = (page - 1) * perPage;
  const filter = { userId };
  if (type) filter.contactType = type;
  if (isFavourite !== undefined) filter.isFavourite = isFavourite === 'true';

  const totalItems = await Contact.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / perPage);
  const sortDir = sortOrder === 'desc' ? -1 : 1;

  const data = await Contact.find(filter)
    .sort({ [sortBy]: sortDir })
    .skip(skip)
    .limit(perPage);

  return {
    data,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
};

export const getContactById = async (id, userId) => {
  return Contact.findOne({ _id: id, userId });
};

export const addContact = async (contactData) => {
  return Contact.create(contactData);
};

export const updateContact = async (id, updatedData, userId) => {
  return Contact.findOneAndUpdate({ _id: id, userId }, updatedData, {
    new: true,
    runValidators: true,
  });
};

export const patchContact = async (id, fields, userId) => {
  return Contact.findOneAndUpdate({ _id: id, userId }, fields, {
    new: true,
    runValidators: true,
  });
};

export const deleteContact = async (id, userId) => {
  return Contact.findOneAndDelete({ _id: id, userId });
};

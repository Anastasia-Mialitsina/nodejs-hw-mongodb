// // // // src/controllers/contactsController.js
// // // import { getAllContacts, getContactByIdService } from '../services/contacts.js';

// // // export const getContacts = async (req, res) => {
// // //   try {
// // //      console.log('Received request to fetch all contacts');
// // //     const contacts = await getAllContacts();
// // //     res.status(200).json({
// // //       status: 200,
// // //       message: 'Successfully found contacts!',
// // //       data: contacts,
// // //     });
// // //   } catch (error) {
// // //     console.error('Error in getContacts:', error);
// // //     res.status(500).json({
// // //       status: 500,
// // //       message: 'Error retrieving contacts',
// // //     });
// // //   }
// // // };

// // // export const getContactById = async (req, res) => {
// // //   try {
// // //     const { contactId } = req.params;
// // //     const contact = await getContactByIdService(contactId);

// // //     if (!contact) {
// // //       return res.status(404).json({ message: 'Contact not found' });
// // //     }

// // //     res.status(200).json({
// // //       status: 200,
// // //       message: `Successfully found contact with id ${contactId}!`,
// // //       data: contact,
// // //     });
// // //   } catch (error) {
// // //     console.error('Error in getContactById:', error);
// // //     res.status(500).json({
// // //       status: 500,
// // //       message: 'Error retrieving contact by ID',
// // //     });
// // //   }
// // // };


// // src/controllers/contactsController.js
// // const contactsOperations = require('../models/contacts'); // если есть такой файл
// // const createError = require('http-errors');

// // const getAllContacts = async (req, res) => {
// //   const contacts = await contactsOperations.listContacts();
// //   res.json({ status: 'success', code: 200, data: { contacts } });
// // };

// // const getContactById = async (req, res) => {
// //   const { contactId } = req.params;
// //   const contact = await contactsOperations.getContactById(contactId);
// //   if (!contact) {
// //     throw createError(404, 'Contact not found');
// //   }
// //   res.json({ status: 'success', code: 200, data: { contact } });
// // };

// // const addContact = async (req, res) => {
// //   const newContact = await contactsOperations.addContact(req.body);
// //   res.status(201).json({ status: 'success', code: 201, data: { newContact } });
// // };

// // const deleteContactById = async (req, res) => {
// //   const { contactId } = req.params;
// //   const result = await contactsOperations.removeContact(contactId);
// //   if (!result) {
// //     throw createError(404, 'Contact not found');
// //   }
// //   res.json({ status: 'success', code: 200, message: 'Contact deleted' });
// // };

// // const updateContactById = async (req, res) => {
// //   const { contactId } = req.params;
// //   const updated = await contactsOperations.updateContact(contactId, req.body);
// //   if (!updated) {
// //     throw createError(404, 'Contact not found');
// //   }
// //   res.json({ status: 'success', code: 200, data: { updated } });
// // };


// // const contactsService = require('../services/contacts');

// // const createContact = async (req, res) => {
// //   const newContact = await contactsService.addContact(req.body);

// //   res.status(201).json({
// //     status: 201,
// //     message: 'Successfully created a contact!',
// //     data: newContact,
// //   });
// // };


// // module.exports = {
// //   getAllContacts,
// //   getContactById,
// //   addContact,
// //   deleteContactById,
// //   updateContactById,
// //   createContact,
// // };


// src/controllers/contactsController.js
// const contactsOperations = require('../models/contacts');
// const contactsService = require('../services/contacts');
// const createError = require('http-errors');

// const getAllContacts = async (req, res) => {
//   const contacts = await contactsOperations.listContacts();
//   res.json({ status: 'success', code: 200, data: { contacts } });
// };

// const getContactById = async (req, res) => {
//   const { contactId } = req.params;
//   const contact = await contactsOperations.getContactById(contactId);
//   if (!contact) {
//     throw createError(404, 'Contact not found');
//   }
//   res.json({ status: 'success', code: 200, data: { contact } });
// };

// const addContact = async (req, res) => {
//   const newContact = await contactsOperations.addContact(req.body);
//   res.status(201).json({ status: 'success', code: 201, data: { newContact } });
// };

// const deleteContactById = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contactsOperations.removeContact(contactId);
//   if (!result) {
//     throw createError(404, 'Contact not found');
//   }
//   res.json({ status: 'success', code: 200, message: 'Contact deleted' });
// };

// const updateContactById = async (req, res) => {
//   const { contactId } = req.params;
//   const updated = await contactsOperations.updateContact(contactId, req.body);
//   if (!updated) {
//     throw createError(404, 'Contact not found');
//   }
//   res.json({ status: 'success', code: 200, data: { updated } });
// };

// const createContact = async (req, res) => {
//   const { name, phoneNumber, contactType } = req.body;

//   if (!name || !phoneNumber || !contactType) {
//     throw createError(400, 'Missing required fields: name, phoneNumber, contactType');
//   }

//   const newContact = await contactsService.addContact(req.body);

//   res.status(201).json({
//     status: 201,
//     message: 'Successfully created a contact!',
//     data: newContact,
//   });
// };



// const patchContactById = async (req, res) => {
//   const { contactId } = req.params;

//   const updatedContact = await contactsService.patchContact(
//     contactId,
//     req.body
//   );

//   if (!updatedContact) {
//     throw createError(404, 'Contact not found');
//   }

//   res.status(200).json({
//     status: 200,
//     message: 'Successfully patched a contact!',
//     data: updatedContact,
//   });
// };


// module.exports = {
//   getAllContacts,
//   getContactById,
//   addContact,
//   deleteContactById,
//   updateContactById,
//   createContact,
//   patchContactById,
// };

// src/controllers/contactsController.js
const contactsOperations = require('../models/contacts');
const contactsService = require('../services/contacts');
const createError = require('http-errors');

const getAllContacts = async (req, res) => {
  const contacts = await contactsOperations.listContacts();
  res.json({ status: 'success', code: 200, data: { contacts } });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsOperations.getContactById(contactId);
  if (!contact) {
    throw createError(404, 'Contact not found');
  }
  res.json({ status: 'success', code: 200, data: { contact } });
};

const addContact = async (req, res) => {
  const newContact = await contactsOperations.addContact(req.body);
  res.status(201).json({ status: 'success', code: 201, data: { newContact } });
};

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.deleteContact(contactId); // ⬅️ заменили на сервис

  if (!result) {
    throw createError(404, 'Contact not found');
  }

  res.status(204).send(); // ⬅️ статус 204, тело отсутствует
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const updated = await contactsOperations.updateContact(contactId, req.body);
  if (!updated) {
    throw createError(404, 'Contact not found');
  }
  res.json({ status: 'success', code: 200, data: { updated } });
};

const createContact = async (req, res) => {
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

const patchContactById = async (req, res) => {
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

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  deleteContactById,
  updateContactById,
  createContact,
  patchContactById,
};

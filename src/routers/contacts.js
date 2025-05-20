// src/routers/contacts.js
import express from 'express';
import contactsController from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/', ctrlWrapper(contactsController.getAllContacts));
router.get('/:contactId', ctrlWrapper(contactsController.getContactById));
router.post('/', ctrlWrapper(contactsController.createContact));
router.delete('/:contactId', ctrlWrapper(contactsController.deleteContactById));
router.put('/:contactId', ctrlWrapper(contactsController.updateContactById));
router.patch('/:contactId', contactsController.patchContactById);

export default router;

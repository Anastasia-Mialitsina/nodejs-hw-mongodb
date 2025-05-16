// src/routers/contacts.js
const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');
const ctrlWrapper = require('../utils/ctrlWrapper');

router.get('/', ctrlWrapper(contactsController.getAllContacts));
router.get('/:contactId', ctrlWrapper(contactsController.getContactById));
router.post('/', ctrlWrapper(contactsController.createContact));
router.delete('/:contactId', ctrlWrapper(contactsController.deleteContactById));
router.put('/:contactId', ctrlWrapper(contactsController.updateContactById));

router.patch('/:contactId', contactsController.patchContactById);


module.exports = router;

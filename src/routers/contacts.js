// src/routers/contacts.js
import express from 'express';
import * as contactsController from '../controllers/contactsController.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import isValidId from '../middlewares/isValidId.js';
import {
  addContactSchema,
  patchContactSchema,
} from '../schemas/contactSchemas.js';

const router = express.Router();

router.get('/', ctrlWrapper(contactsController.getAllContacts));
router.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactsController.getContactById)
);
router.post(
  '/',
  validateBody(addContactSchema),
  ctrlWrapper(contactsController.createContact)
);
router.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactsController.deleteContactById)
);
router.put(
  '/:contactId',
  isValidId,
  validateBody(addContactSchema),
  ctrlWrapper(contactsController.updateContactById)
);
router.patch(
  '/:contactId',
  isValidId,
  validateBody(patchContactSchema),
  ctrlWrapper(contactsController.patchContactById)
);

export default router;

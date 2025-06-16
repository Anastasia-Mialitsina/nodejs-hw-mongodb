// src/routers/contacts.js
// import express from 'express';
// import * as contactsController from '../controllers/contactsController.js';
// import ctrlWrapper from '../utils/ctrlWrapper.js';
// import validateBody from '../middlewares/validateBody.js';
// import isValidId from '../middlewares/isValidId.js';
// import authenticate from '../middlewares/authenticate.js';
// import {
//   addContactSchema,
//   patchContactSchema,
// } from '../schemas/contactSchemas.js';

// const router = express.Router();

// router.use(authenticate);

// router.get('/', ctrlWrapper(contactsController.getAllContacts));
// router.get(
//   '/:contactId',
//   isValidId,
//   ctrlWrapper(contactsController.getContactById)
// );
// router.post(
//   '/',
//   validateBody(addContactSchema),
//   ctrlWrapper(contactsController.createContact)
// );
// router.put(
//   '/:contactId',
//   isValidId,
//   validateBody(addContactSchema),
//   ctrlWrapper(contactsController.updateContactById)
// );
// router.patch(
//   '/:contactId',
//   isValidId,
//   validateBody(patchContactSchema),
//   ctrlWrapper(contactsController.patchContactById)
// );
// router.delete(
//   '/:contactId',
//   isValidId,
//   ctrlWrapper(contactsController.deleteContactById)
// );

// export default router;


//6
// src/routers/contacts.js
import express from 'express';
import * as contactsController from '../controllers/contactsController.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import isValidId from '../middlewares/isValidId.js';
import authenticate from '../middlewares/authenticate.js';
import upload from '../middlewares/upload.js'; // ✅
import {
  addContactSchema,
  patchContactSchema,
} from '../schemas/contactSchemas.js';

const router = express.Router();

router.use(authenticate);

router.get('/', ctrlWrapper(contactsController.getAllContacts));
router.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactsController.getContactById)
);
router.post(
  '/',
  upload.single('photo'), // ✅
  validateBody(addContactSchema),
  ctrlWrapper(contactsController.createContact)
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
  upload.single('photo'), // ✅
  validateBody(patchContactSchema),
  ctrlWrapper(contactsController.patchContactById)
);
router.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactsController.deleteContactById)
);

export default router;


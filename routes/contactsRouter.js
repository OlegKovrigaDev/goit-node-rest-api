import express from 'express';
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateFavoriteContact,
} from '../controllers/contactsControllers.js';

import validateBody from '../helpers/validateBody.js';
import { isValidId } from '../helpers/isValidId.js';
import authenticate from '../helpers/authenticate.js';
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from '../schemas/contactsSchemas.js';

const contactsRouter = express.Router();

contactsRouter.get('/', authenticate, getAllContacts);

contactsRouter.get('/:id', authenticate, isValidId, getOneContact);

contactsRouter.delete('/:id', authenticate, isValidId, deleteContact);

contactsRouter.post(
  '/',
  authenticate,
  validateBody(createContactSchema),
  createContact
);

contactsRouter.put(
  '/:id',
  authenticate,
  isValidId,
  validateBody(updateContactSchema),
  updateContact
);

contactsRouter.patch(
  '/:id/favorite',
  authenticate,
  isValidId,
  validateBody(updateFavoriteSchema),
  updateFavoriteContact
);
export default contactsRouter;

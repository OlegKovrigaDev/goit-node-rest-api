import contactsService from '../services/contactsServices.js';

import HttpError from '../helpers/HttpError.js';
import validateBody from '../helpers/validateBody.js';

const { listContacts, getContactById, removeContact, addContact, updateById } =
  contactsService;

export const getAllContacts = async (req, res) => {
  const result = await listContacts();
  res.status(200).json(result);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await getContactById(id);

  if (!result) {
    throw HttpError(404, 'Not Found');
  }

  res.status(200).json(result);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await removeContact(id);

  if (!result) {
    throw HttpError(404, 'Not Found');
  }

  res.status(200).json(result);
};

export const createContact = async (req, res) => {
  const result = await addContact(req.body);
  res.status(201).json(result);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await updateById(id, req.body);

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.status(200).json(result);
};

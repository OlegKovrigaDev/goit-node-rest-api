import contactsService from '../services/contactsServices.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../schemas/contactsSchemas.js';

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
    res.status(404).json({ message: 'Not found' });
  }

  res.status(200).json(result);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await removeContact(id);

  if (!result) {
    res.status(404).json({ message: 'Not found' });
  }

  res.status(200).json(result);
};

export const createContact = async (req, res) => {
  const { name, email, phone } = req.body;

  const { error } = createContactSchema.validate({ name, email, phone });
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const result = await addContact(name, email, phone);
  res.status(201).json(result);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  if (!name && !email && !phone && Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ message: 'Body must have at least one field' });
  }

  const { error } = updateContactSchema.validate({ name, email, phone });
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const result = await updateById(id, req.body);

  if (!result) {
    res.status(404).json({ message: 'Not found' });
  }

  res.status(200).json(result);
};

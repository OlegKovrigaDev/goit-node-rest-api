import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('db', 'contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(c => c.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactToRemove = contacts.find(c => c.id === contactId);
  if (!contactToRemove) return null;

  const updatedContacts = contacts.filter(c => c.id !== contactId);

  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  return contactToRemove;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

async function updateById(id, data) {
  const contacts = await listContacts();

  const contactIndex = contacts.findIndex(el => el.id === id);
  if (contactIndex === -1) {
    return null;
  }

  const contactToUpdate = contacts.find(el => el.id === id);
  contacts[contactIndex] = { id, ...contactToUpdate, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[contactIndex];
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
};

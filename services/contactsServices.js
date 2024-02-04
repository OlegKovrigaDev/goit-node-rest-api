import { Contact } from '../models/contactModel.js';

async function listContacts() {
  return await Contact.find();
}

async function getContactById(contactId) {
  return (await Contact.findById(contactId)) || null;
}

async function removeContact(contactId) {
  return (await Contact.findByIdAndDelete(contactId)) || null;
}

async function addContact(name, email, phone) {
  return (await Contact.create({ name, email, phone })) || null;
}

async function updateById(id, name, email, phone) {
  const contact = await Contact.findById(id);

  if (!contact) {
    return null;
  }

  contact.name = name || contact.name;
  contact.email = email || contact.email;
  contact.phone = phone || contact.phone;

  await contact.save();

  return contact;
}

async function updateStatusContact(id, favorite) {
  return (
    (await Contact.findByIdAndUpdate(id, { favorite }, { new: true })) || null
  );
}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
  updateStatusContact,
};

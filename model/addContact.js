const { nanoid } = require("nanoid");

const listContacts = require("./listContacts");
const updateContacts = require("./updateContacts");

async function addContact(data) {
  const contacts = await listContacts();
  const newContact = { id: nanoid(5), ...data };
  contacts.push(newContact);
  await updateContacts(contacts);

  return newContact;
}

module.exports = addContact;

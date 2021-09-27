const listContacts = require("./listContacts");
const updateContacts = require("./updateContacts");

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex(i => i.id.toString() === contactId);

  if (idx === -1) return null;

  contacts.splice(idx, 1);
  await updateContacts(contacts);

  return "Success remove";
}

module.exports = removeContact;

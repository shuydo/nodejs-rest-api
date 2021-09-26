const updateContacts = require("./updateContacts");
const listContacts = require("./listContacts");

const updateContact = async (id, data) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(i => i.id.toString() === id);

  if (idx === -1) return null;

  const updateData = { ...contacts[idx], ...data };
  contacts[idx] = updateData;
  await updateContacts(contacts);
  return updateData;
};

module.exports = updateContact;

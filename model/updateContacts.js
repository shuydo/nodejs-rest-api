const fs = require("fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "../db/", "contacts.json");

const updateContact = async newContacts =>
  await fs.writeFile(filePath, JSON.stringify(newContacts));

module.exports = updateContact;

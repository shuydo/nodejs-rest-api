const { NotFound } = require("http-errors");

const { sendSuccesRes } = require("../helpers");
const contactActions = require("../model");

const listContacts = async (_, res) => {
  const result = await contactActions.listContacts();
  sendSuccesRes(res, { result });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactActions.getContactById(contactId);
  if (!result) throw new NotFound("Not found");

  sendSuccesRes(res, { result });
};

const addContact = async (req, res) => {
  const result = await contactActions.addContact(req.body);
  sendSuccesRes(res, { result }, 201);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactActions.updateContact(contactId, req.body);
  if (!result) throw new NotFound("Not found");

  sendSuccesRes(res, { result });
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactActions.removeContact(contactId);
  if (!result) throw new NotFound("Not found");

  sendSuccesRes(res, { message: "contact deleted" });
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};

const { NotFound } = require("http-errors");

const { sendSuccesRes } = require("../../helpers");
const { Contact } = require("../../models");

const listContacts = async (_, res) => {
  const result = await Contact.find({}, "_id name email phone favorite");
  sendSuccesRes(res, { result });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(
    contactId,
    "_id name email phone favorite"
  );

  if (!result) throw new NotFound("Not found");
  sendSuccesRes(res, { result });
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  sendSuccesRes(res, { result }, 201);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) throw new NotFound("Not found");
  sendSuccesRes(res, { result });
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(contactId, { favorite }, {
    new: true,
  });
  if (!result) throw new NotFound("Not found");
  sendSuccesRes(res, { result });
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) throw new NotFound("Not found");
  sendSuccesRes(res, { message: "contact deleted" });
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact,
};

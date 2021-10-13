const { NotFound } = require("http-errors");

const { sendSuccesRes } = require("../../helpers");
const { Contact } = require("../../models");

const listContacts = async (_, res) => {
  const result = await Contact.find({}, "_id name email phone favorite");
  sendSuccesRes(res, { result });
};

const getContactById = async req => {
  // log("in gCBid");
  const { contactId } = req.params;
  const result = await Contact.findById(
    contactId,
    "_id name email phone favorite"
  );

  if (!result) throw new NotFound("Not found gCBid");
  sendSuccesRes(res, { result });
};

const getContactsByUser = async (req, res) => {
  // console.log("in getContactsByUser");
  const { _id } = req.user;
  const result = await Contact.find({ owner: _id },"_id name email phone favorite");
  sendSuccesRes(res, result, 200);
};
const addContact = async (req, res) => {
  // console.log("in addC");
  const result = await Contact.create({ ...req.body, owner: req.user._id });
  console.log(result);
  const { _id, name, email, phone, favorite, owner } = result;
  sendSuccesRes(res, { _id, name, email, phone, favorite, owner }, 201);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) throw new NotFound("Not found uC");
  sendSuccesRes(res, { result });
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );
  if (!result) throw new NotFound("Not found usC");
  sendSuccesRes(res, { result });
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) throw new NotFound("Not found rC");
  sendSuccesRes(res, { message: "contact deleted" });
};

module.exports = {
  listContacts,
  getContactById,
  getContactsByUser,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact,
};

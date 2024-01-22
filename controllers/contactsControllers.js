import {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const result = await listContactsService();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getContactByIdService(id);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await removeContactService(id);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const result = await addContactService(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const keys = Object.keys(req.body);

    if (keys.length === 0) {
      throw HttpError(400, "Body must have at least one field");
    }

    const { id } = req.params;
    const result = await updateContactService(id, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

import Qualification from "../models/qualification.model.js";

const create = async (req, res) => {
  try {
    const qualification = await new Qualification(req.body).save();
    return res.status(200).json(qualification);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const list = async (req, res) => {
  try {
    const qualifications = await Qualification.find();
    res.json(qualifications);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const qualificationByID = async (req, res, next, id) => {
  try {
    const qualification = await Qualification.findById(id);
    if (!qualification)
      return res.status(404).json({ error: "Qualification not found" });
    req.profile = qualification;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Could not retrieve qualification" });
  }
};

const read = (req, res) => {
  return res.json(req.profile);
};

const update = async (req, res) => {
  try {
    const qualification = Object.assign(req.profile, req.body);
    await qualification.save();
    res.json(qualification);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await req.profile.deleteOne();
    res.json(deleted);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const removeAll = async (req, res) => {
  try {
    await Qualification.deleteMany({});
    res.json({ message: "All qualifications deleted" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export default {
  create,
  list,
  qualificationByID,
  read,
  update,
  remove,
  removeAll
};
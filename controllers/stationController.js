const Station = require("../models/Station");
const Joi = require("joi");

const stationSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  location: Joi.string().min(3).max(30),
});

const createStation = async (req, res) => {
  const { name, location } = req.body;
  const { error } = stationSchema.validate({ name, location });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const station = new Station({ name, location });
    await station.save();
    res.status(201).json(station);
  } catch (error) {
    res.status(400).json({ error: `Station couldn't be created : ${error}` });
  }
};

const getStations = async (req, res) => {
  try {
    const stations = await Station.find();
    res.status(200).json(stations);
  } catch (error) {
    res.status(500).json({ error: `Stations couldn't be found : ${error}` });
  }
};

const getStationById = async (req, res) => {
  const { id } = req.params;
  try {
    const station = await Station.findById(id);
    if (!station) {
      return res.status(404).json({ message: "Stations couldn't be found" });
    }
    res.status(200).json(station);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStation = async (req, res) => {
  const { id } = req.params;
  const { name, location } = req.body;
  const { error } = stationSchema.validate({ name, location });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const updatedStation = await Station.findByIdAndUpdate(
      id,
      { name, location },
      { new: true, runValidators: true }
    );
    if (!updatedStation) {
      return res.status(404).json({ error: "Stations couldn't be found" });
    }
    res.status(200).json(updatedStation);
  } catch (error) {
    res.status(400).json({ error: `Error updating station: ${error}` });
  }
};

const deleteStation = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedStation = await Station.findByIdAndDelete(id);
    if (!deletedStation) {
      return res.status(404).json({ error: "Stations couldn't be found" });
    }
    res.status(200).json({ message: "Station deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: `Error deleting station: ${error}` });
  }
};

module.exports = {
  createStation,
  getStations,
  getStationById,
  updateStation,
  deleteStation,
};

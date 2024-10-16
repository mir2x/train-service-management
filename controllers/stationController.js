const Station = require("../models/Station");

const createStation = async (req, res) => {
  try {
    const { name, location } = req.body;
    const station = new Station({ name, location });
    await station.save();
    res.status(201).json(station);
  } catch (err) {
    res.status(400).json({ error: "Error creating station" });
  }
};

const getStations = async (req, res) => {
  try {
    const stations = await Station.find();
    res.status(200).json(stations);
  } catch (err) {
    res.status(500).json({ error: "Error fetching stations" });
  }
};

const getStationById = async (req, res) => {
  try {
    const { id } = req.params;
    const station = await Station.findByIdAndDelete(id);
    if (!station) {
      return res.status(404).json({ message: "Station not found" });
    }
    res.status(200).json(station);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location } = req.body;

    const updatedStation = await Station.findByIdAndUpdate(
      id,
      { name, location },
      { new: true, runValidators: true }
    );

    if (!updatedStation) {
      return res.status(404).json({ error: "Station not found" });
    }

    res.status(200).json(updatedStation);
  } catch (err) {
    res.status(400).json({ error: "Error updating station" });
  }
};

const deleteStation = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStation = await Station.findByIdAndDelete(id);

    if (!deletedStation) {
      return res.status(404).json({ error: "Station not found" });
    }

    res.status(200).json({ message: "Station deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting station" });
  }
};

module.exports = {
  createStation,
  getStations,
  getStationById,
  updateStation,
  deleteStation,
};

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

module.exports = { createStation, getStations };

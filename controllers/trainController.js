const Train = require("../models/Train");

const createTrain = async (req, res) => {
  try {
    const { name, stops } = req.body;
    const train = new Train({ name, stops });
    await train.save();
    res.status(201).json(train);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTrains = async (req, res) => {
  try {
    const trains = await Train.find().populate("stops.station");
    res.status(200).json(trains);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTrainById = async (req, res) => {
  try {
    const { id } = req.params;
    const train = await Train.findById(id).populate("stops.station");
    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }
    res.status(200).json(train);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTrain = async (req, res) => {
  const { id } = req.params;
  const { name, stops } = req.body;
  try {
    const train = await Train.findByIdAndUpdate(
      id,
      { name, stops },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }
    res.status(200).json(train);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTrain = async (req, res) => {
  const { id } = req.params;
  try {
    const train = await Train.findByIdAndDelete(id);
    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }
    res.status(200).json({ message: "Train deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTrain,
  getTrains,
  getTrainById,
  updateTrain,
  deleteTrain,
};

const Train = require("../models/Train");

const createTrain = async (req, res) => {
  try {
    const { name, stops } = req.body;
    const train = new Train({ name, stops });
    await train.save();
    res.status(201).json(train);
  } catch (err) {
    res.status(400).json({ error: "Error creating train" });
  }
};

const getTrains = async (req, res) => {
  try {
    const trains = await Train.find().populate("stops.station");
    res.status(200).json(trains);
  } catch (err) {
    res.status(500).json({ error: "Error fetching trains" });
  }
};

module.exports = { createTrain, getTrains };

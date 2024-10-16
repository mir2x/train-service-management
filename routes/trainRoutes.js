const express = require("express");
const {
  createTrain,
  getTrains,
  getTrainById,
  updateTrain,
  deleteTrain,
} = require("../controllers/trainController");
const router = express.Router();

router.post("/create", createTrain);
router.get("/", getTrains);
router.get("/:id", getTrainById);
router.put("/update/:id", updateTrain);
router.delete("/delete/:id", deleteTrain);

module.exports = router;

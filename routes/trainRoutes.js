const express = require("express");
const {
  createTrain,
  getTrains,
  getTrainById,
  updateTrain,
  deleteTrain,
} = require("../controllers/trainController");
const { isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", isAdmin, createTrain);
router.get("/", getTrains);
router.get("/:id", getTrainById);
router.put("/update/:id", isAdmin, updateTrain);
router.delete("/delete/:id", isAdmin, deleteTrain);

module.exports = router;

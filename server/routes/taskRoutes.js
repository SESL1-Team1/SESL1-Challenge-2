const express = require("express");
const router = express.Router();
const {
  createTask,
  deleteTask,
  updateTask,
  getAllTasks,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getAllTasks).post(protect, createTask);
router.route("/:id").put(protect, updateTask).delete(protect, deleteTask);

module.exports = router;

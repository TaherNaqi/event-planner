const express = require("express");
const router = express.Router();
const {
  fetchList,
  createEvent,
  deleteEvent,
  fetchEvent,
  updateEvent,
  searchByName,
} = require("./controller");
router.get("/", fetchList);
router.post("/", createEvent);

router.delete("/:eventId", deleteEvent);
// router.get("/:eventId", fetchEvent);
router.get("/:name", searchByName);
router.put("/:eventId", updateEvent);

module.exports = router;

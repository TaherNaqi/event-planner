const express = require("express");
const router = express.Router();
const {
  fetchList,
  createEvent,
  deleteEvent,
  fetchEvent,
  updateEvent,
  searchByName,
  fullyBooked,
} = require("./controller");
router.get("/fullybooked", fullyBooked);
router.get("/names/:query", searchByName);
router.get("/:eventId", fetchEvent);
router.get("/", fetchList);
router.post("/", createEvent);
router.delete("/:eventId", deleteEvent);
router.put("/:eventId", updateEvent);

module.exports = router;

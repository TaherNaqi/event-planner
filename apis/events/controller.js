const Event = require("../../db/models/Event");
exports.fetchList = async (req, res) => {
  try {
    const eventArray = await Event.find();
    res.json(eventArray);
  } catch (error) {
    res.json({ message: error.message });
  }
};
exports.createEvent = async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const foundEvent = await Event.findByIdAndDelete({ _id: eventId });
    if (foundEvent) res.status(204).end();
    else res.status(404).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.fetchEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const foundEvent = await Event.findById(eventId);
    if (foundEvent) res.status(200).json(foundEvent);
    else res.status(404);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const foundEvent = await Event.findByIdAndUpdate(
      { _id: eventId },
      req.body,
      { new: true, runValidators: true }
    );
    if (foundEvent) res.status(200).json(foundEvent);
    else res.status(404).json({ message: "not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.searchByName = async (req, res) => {
  try {
    const { query } = req.params;
    let foundEvents = await Event.find({
      name: new RegExp("^" + query + "$", "i"),
    });
    res.status(200).json(foundEvents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.fullyBooked = async (req, res) => {
  try {
    const foundEvents = await Event.find({
      $expr: { $eq: ["$numberOfSeats", "$bookedSeats"] },
    });
    if (foundEvents) res.status(200).json(foundEvents);
    else res.status(404).json({ message: "not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

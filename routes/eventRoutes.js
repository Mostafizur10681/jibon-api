const express = require("express");
const EventModel = require("../models/eventModel");
const {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

const router = express();

// create a event
router.post("/addEvent", createEvent);

// get all events
router.get("/getEvents", getEvents);

// get a event
router.get("/getEvent/:id", getEvent);

// update a event
router.put("/updateEvent/:id", updateEvent);

// delete a event
router.delete("/deleteEvent/:id", deleteEvent);

module.exports = router;

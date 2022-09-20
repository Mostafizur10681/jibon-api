const express = require("express");
const EventModel = require("../models/eventModel");
const {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const requireAuth = require("../middleware/requireAuth");

const router = express();

// create a event
router.post("/addEvent", requireAuth, createEvent);

// get all events
router.get("/getEvents", getEvents);

// get a event
router.get("/getEvent/:id", getEvent);

// update a event
router.put("/updateEvent/:id", updateEvent);

// delete a event
router.delete("/deleteEvent/:id", deleteEvent);

module.exports = router;

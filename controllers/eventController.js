const EventModel = require("../models/eventModel");

// create a event
const createEvent = async (req, res) => {
  const { title, img, description } = req.body;
  try {
    const event = await EventModel.create({
      title,
      img,
      description,
      progress:"live",
    });
    res.status(200).json({
      event,
      message: "Event was inserted successfully!",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all events
const getEvents = async (req, res) => {
  try {
    const events = await EventModel.find({});
    res.status(200).json({
      events,
      message: "Events gets successfully!",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a event
const getEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await EventModel.findById({ _id: id });
    if (!event) {
      return res.status(400).json({ error: "Not such a Event." });
    } else {
      res.status(200).json({
        event,
        message: "Event gets successfully!",
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update a event
const updateEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await EventModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          title: req.body?.title,
          img: req.body?.img,
          description: req.body?.description,
          progress: req.body?.progress,
        },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    if (!event) {
      return res.status(400).json({ error: "Not such a Event." });
    } else {
      res.status(200).json({
        event,
        message: "Event update successfully!",
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a event
const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await EventModel.findOneAndDelete({ _id: id });
    if (!event) {
      return res.status(400).json({ error: "Not such a Event." });
    } else {
      res.status(200).json({
        event,
        message: "Event deleted successfully!",
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};

module.exports = function (app) {

    const eventController = require('../controllers/events.controller');


    // ***** Normal CRUD operations*****

    //  add event
    app.post("/event/user/:id", eventController.addEvent);

    //  delete event by id
    app.delete("/event/:id", eventController.deleteEventById);

    // get event by id
    app.get("/event/:id", eventController.getEventById);

    // update event by id
    app.put("/event/:id", eventController.updateEventById);

    //get all the events in the db
    app.get("/events", eventController.getAllEvents);

    // ****** Advance searches *****
    app.post("/events/filter", eventController.getEventsByFilter);

}
module.exports = function (app) {

    const eventController = require('../controllers/events.controller');


    // ***** Normal CRUD operations*****

    //  add event
    app.post("/event", eventController.addEvent);

    //  delete event by id
    app.delete("/event", eventController.deleteEventById);

    //  edit event by id
    app.put("/event", eventController.updateEventById);


    // ****** Advance searches by filtering *****
    // by category, event type, time of event, price
    // single filter or any combinations of these filters
    // can be passed in query string
    // the route for all these will be as follows
    app.get("/events", eventController.getEventsByFilter);

}
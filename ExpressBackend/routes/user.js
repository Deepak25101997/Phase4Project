module.exports = function (app) {

    const userController = require('../controllers/user.controller');

    // view my events
    app.get("/user/myevents", userController.getMyEvents);

}
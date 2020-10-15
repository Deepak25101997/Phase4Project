module.exports = function (app) {

    const userController = require('../controllers/user.controller');

    // signup
    app.post("/user/signup", userController.signUpUser);

    // view my events
    app.get("/user/myevents", userController.getMyEvents);

}
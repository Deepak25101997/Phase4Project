const authMiddleware = require('../middleware/auth');

module.exports = function (app) {

    const userController = require('../controllers/user.controller');

    // signup
    app.post("/user/signup", userController.signUpUser);

    // view my events
    app.get("/user/myevents/:id", authMiddleware, userController.getMyEvents);

    app.get("/users", userController.getAllUsers);

}
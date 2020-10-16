const auth = require("../middleware/auth");

module.exports = function (app) {

    const userController = require('../controllers/user.controller');

    // signup
    app.post("/user/signup", userController.signUpUser);

    // view my events
    app.get("/user/myevents/:id", userController.getMyEvents);

    app.get("/users", userController.getAllUsers);

    // app.get('/test', auth, (req, res, next) => {
    //     console.log(req.user);
    //     res.json({ "msg": "hello" });
    // })
}
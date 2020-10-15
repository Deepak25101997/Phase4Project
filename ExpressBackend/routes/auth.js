module.exports = function (app) {

    const authController = require('../controllers/auth.controller');

    // signup
    app.post("/auth/user/signup", authController.signUpUser);

    //login
    app.post("/auth/user/login", authController.loginUser);

}
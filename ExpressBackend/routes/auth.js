module.exports = function (app) {

    const authController = require('../controllers/auth.controller');

    //login
    app.post("/auth/user/login", authController.loginUser);

}
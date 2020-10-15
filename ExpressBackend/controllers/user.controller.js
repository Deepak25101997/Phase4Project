const User = require('../Models/user.model');

exports.signUpUser = (req, res, next) => {

    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const username = req.body.username;
    const password = req.body.password;

    //basic check
    if (!name || !email || !phone || !username || !password) {
        res.status(400).json({
            message: "Please fill all the fields !"
        })
    }

    //check for existing email
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                const newUser = new User({ name: name, email: email, phone: phone, username: username, password: password });
                return newUser.save();
            }
            res.status(403).json({
                message: "Email already exists !"
            })
        })
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => res.status(404).json({
            message: "Unable to signup due to error : " + err
        }))

}

exports.getMyEvents = (req, res, next) => {

}
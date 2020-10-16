const User = require('../Models/user.model');
const Event = require('../Models/event.model');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { has } = require('config');


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

    var hashPassword = null;
    //check for existing email
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                res.status(403).json({
                    message: "Email already exists !"
                })
            }


            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) throw err;
                    const newUser = new User({ name: name, email: email, phone: phone, username: username, password: hash });
                    newUser.save()
                        .then(user => {
                            res.status(201).json({
                                message: "Signed Up Successfully !",
                                user: {
                                    id: user._id,
                                    name: user.name,
                                    username: user.username
                                }
                            })
                        })
                        .catch(err => res.status(500).json({
                            message: "Unable to signup due to error : " + err
                        }))
                })
            });
        })
        .catch(err => res.status(500).json({
            message: "Unable to signup due to error : " + err
        }))

}

exports.getMyEvents = (req, res, next) => {

    const uid = req.params.id;

    Event.find({ user: uid })
        .populate({
            path: 'user',
            select: '_id name email phone'
        })
        .exec((err, event) => {
            if (err) {
                return res.status(500).json({
                    message: "Unable to find event due to error : " + err
                })
            }
            if (!event) {
                res.status(404).json({
                    message: "Event not found !"
                })
            }
            res.status(200).json(event);
        })

}


exports.getAllUsers = (req, res, next) => {

    User.find()
        .then(users => {
            if (!users) {
                res.status(404).json({
                    message: "No Users found !"
                })
            }
            res.status(200).json(users);
        })
        .catch(err => res.status(500).json({
            message: "Unable to get users due to error : " + err
        }))

}
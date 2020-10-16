const User = require('../Models/user.model');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');


exports.loginUser = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    //basic check
    if (!email || !password) {
        res.status(400).json({
            message: "Please fill all the fields !"
        })
    }

    //Check if user with sent email exist
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                res.status(400).json({
                    message: "User doesn't exists !"
                })
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        res.status(400).json({
                            message: "Invalid Credentials !!"
                        })
                    }

                    jwt.sign({
                        id: user._id
                    }, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
                        if (err) throw err;
                        res.status(201).json({
                            token: token,
                            user: {
                                id: user._id,
                                name: user.name,
                                username: user.username
                            }
                        });
                    })

                })
                .catch(err => res.status(500).json({
                    message: "Unable to login due to error : " + err
                }))
        })
        .catch(err => res.status(500).json({
            message: "Unable to login due to error : " + err
        }))

}
const Event = require('../Models/event.model');
const User = require('../Models/user.model');
const events = require('../routes/events');

exports.addEvent = (req, res, next) => {

    const uid = req.params.id;
    const title = req.body.title;
    const category = req.body.category;
    const type = req.body.type;
    const location = req.body.location;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const description = req.body.description;
    const organizerName = req.body.organizerName;
    const organizerContact = req.body.organizerContact;
    const price = req.body.price;

    if (!title || !category || !type || !location || !startDate || !endDate
        || !description || !organizerName || !organizerContact || price < 0) {
        res.status(400).json({
            message: "Please fill all the fields and check that price is not negative !"
        })
    }

    const newEvent = new Event({
        title: title,
        category: category,
        type: type,
        location: location,
        startDate: startDate,
        endDate: endDate,
        description: description,
        organizerName: organizerName,
        organizerContact: organizerContact,
        price: price,
        user: uid
    });

    newEvent.save()
        .then(event => {
            res.status(201).json({
                message: "Event added Successfully !",
                event: {
                    title: event.title,
                    location: event.location,
                    startDate: event.startDate,
                    endDate: event.endDate,
                    price: event.price
                }
            })
        })
        .catch(err => res.status(500).json({
            message: "Unable to add event due to error : " + err
        }))

};

exports.getEventById = (req, res, next) => {

    const id = req.params.id;

    Event.findById(id)
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


exports.deleteEventById = (req, res, next) => {

    const id = req.params.id;

    Event.findById(id)
        .then(event => {
            if (!event) {
                res.status(404).json({
                    message: "Event not found !"
                })
            }
            return Event.findByIdAndRemove(id);
        })
        .then(result => {
            res.status(200).json({
                message: "Event with id: " + id + " deleted successfully !"
            })
        })
        .catch(err => res.status(500).json({
            message: "Unable to delete event due to error : " + err
        }))

};


exports.updateEventById = (req, res, next) => {

    const id = req.params.id;
    const title = req.body.title;
    const category = req.body.category;
    const type = req.body.type;
    const location = req.body.location;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const description = req.body.description;
    const organizerName = req.body.organizerName;
    const organizerContact = req.body.organizerContact;
    const price = req.body.price;


    if (!title || !category || !type || !location || !startDate || !endDate
        || !description || !organizerName || !organizerContact || price < 0) {
        res.status(400).json({
            message: "Please fill all the fields and check that price is not negative !"
        })
    }

    Event.findById(id)
        .then(event => {
            if (!event) {
                res.status(404).json({
                    message: "Event not found !"
                })
            }

            return Event.findByIdAndUpdate(id, {
                title: title,
                category: category,
                type: type,
                location: location,
                startDate: startDate,
                endDate: endDate,
                description: description,
                organizerName: organizerName,
                organizerContact: organizerContact,
                price: price
            }, { new: true });
        })
        .then(event => {
            if (!event) {
                res.status(404).json({
                    message: "Event not found !"
                })
            }

            res.status(200).json({
                message: "Updation Successful !!",
                event: event
            });
        })
        .catch(err => res.status(500).json({
            message: "Unable to update event due to error : " + err
        }))

};


exports.getAllEvents = (req, res, next) => {

    Event.find()
        .populate({
            path: 'user',
            select: '_id name email phone'
        })
        .exec((err, events) => {
            if (err) {
                return res.status(500).json({
                    message: "Unable to find events due to error : " + err
                })
            }
            if (!events) {
                res.status(404).json({
                    message: "Events not found !"
                })
            }
            res.status(200).json(events);
        })
}


exports.getEventsByFilter = (req, res, next) => {

    const category = req.body.category;
    const type = req.body.type;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const price = req.body.price;

    Event.find({
        category: category,
        type: type,
        startDate: { $gte: startDate },
        endDate: { $lte: endDate },
        price: price
    })
        .populate({
            path: 'user',
            select: '_id name email phone'
        })
        .exec((err, events) => {
            if (err) {
                return res.status(500).json({
                    message: "Unable to find events due to error : " + err
                })
            }
            if (!events) {
                res.status(404).json({
                    message: "Events not found !"
                })
            }
            res.status(200).json(events);
        })
};



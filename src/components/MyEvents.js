import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser, getToken } from '../Utils/Common';
import Axios from 'axios';

class MyEvents extends Component {


    constructor(props) {
        super(props);

        this.state = {
            events: [],
            responseError: "",
            userIdError: true
        }
    }

    getEvents = () => {

        if (getUser() == null) {
            this.setState({ userIdError: true })
        }
        else {
            Axios.get("http://localhost:3001/user/myevents/" + getUser().id, {
                headers: {
                    "x-auth-token": getToken()
                }
            })
                .then((res) => {
                    const eventsList = res.data;
                    this.setState({ events: eventsList, userIdError: false });
                })
                .catch(err => {
                    console.log("There is some error : ", err);
                })
        }
    }


    deleteNote(id) {
        Axios.delete('http://localhost:3001/event/' + id)
            .then((result) => {
                alert("Event deleted successfully !");
                this.getEvents();
            })
            .catch(err => console.log("There is some error : " + err));
    }

    componentDidMount = () => {
        this.getEvents();
    }


    render() {
        var err = null;
        { this.state.userIdError ? err = true : err = false }

        if (err) {
            return (
                <div className="container">
                    <div className="alert alert-danger" role="alert">
                        <h3>Please Login to View and Manage Your Events !!</h3>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="container">
                    {getUser() !== null && this.state.events.length > 0 ? <h3 className="text-success">Here You Go ! Enjoy Managing Your Events.</h3> : <h3 className="text-danger">OOPS, no events found. Add events.</h3>}
                    <br />
                    {getUser() !== null ? <Link to="/eventAdd" className="btn btn-info" >Add New Event</Link>
                        : <Link to="/eventAdd" className="btn btn-secondary disabled">Login to add new event</Link>}
                    <br /><br />
                    {getUser() !== null ?
                        <div className="row">
                            {this.state.events.map((eventValue, index) => {
                                return (
                                    <div className="col-sm-3 mt-3">
                                        <div key={index} className="card rounded border border-success">
                                            <div className="card-body">
                                                <h3 className="card-title text-danger title">{eventValue.title}</h3>
                                                <p className="card-text">Location: {eventValue.location}</p>
                                                <p className="card-title">Begins: {eventValue.startDate}</p>
                                                <p className="card-title">Category: {eventValue.category}</p>
                                                <div className="container">
                                                    <Link to={'/eventDetail/' + eventValue._id} style={{ margin: 2 }} className="btn btn-primary btn-sm">Details</Link>
                                                    <Link to={'/eventEdit/' + eventValue._id} style={{ margin: 2 }} className="btn btn-warning btn-sm">Edit</Link>
                                                    <button onClick={this.deleteNote.bind(this, eventValue._id)} style={{ margin: 2 }} className="btn btn-danger btn-sm">Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        : <div className="container">
                            <div className="alert alert-danger" role="alert">
                                <h3>Please Login to View and Manage Your Events !!</h3>
                            </div>
                        </div>}
                </div >
            )
        }
    }

}

export default MyEvents;
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { getUser } from '../Utils/Common';
import Axios from 'axios';

class Events extends Component {


    constructor(props) {
        super(props);

        this.state = {
            events: [],
            responseError: ""
        }
    }

    getEvents = () => {
        Axios.get("http://localhost:3001/events")
            .then((res) => {
                const eventsList = res.data;
                this.setState({ events: eventsList });
            })
            .catch(err => {
                console.log("There is some error : ", err);
            })
    }


    componentDidMount = () => {
        this.getEvents();
    }


    render() {
        return (
            <div className="container">
                <h3>{this.state.events.length > 0 ? "Here You Go !!" : "OOPS, Sorry no events found."}</h3>
                <br />
                {getUser() !== null ? <Link to="/eventAdd" className="btn btn-info" >Add New Event</Link> : <Link to="/eventAdd" className="btn btn-secondary disabled">Login to add new event</Link>}
                <br /><br />
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
                                        <Link to={'/eventDetail/' + eventValue._id} className="btn btn-primary btn-sm">Details</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div >
        )
    }

}

export default Events;
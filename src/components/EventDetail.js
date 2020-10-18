import Axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../Utils/Common';


class EventDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            event: {}
        }

    }

    componentDidMount = () => {
        Axios.get('http://localhost:3001/event/' + this.props.match.params.id)
            .then(res => {
                this.setState({ event: res.data });
            })
            .catch(err => console.log("There is some error : " + err));
    }


    render() {
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            Details of <span className="text-success">{this.state.event.title}</span>
                        </h3>
                        <br />
                    </div>
                    <div className="panel-body">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>Event Title</th>
                                    <td>{this.state.event.title}</td>
                                </tr>
                                <tr>
                                    <th>Category</th>
                                    <td>{this.state.event.category}</td>
                                </tr>
                                <tr>
                                    <th>Type</th>
                                    <td>{this.state.event.type}</td>
                                </tr>
                                <tr>
                                    <th>Location</th>
                                    <td>{this.state.event.location}</td>
                                </tr>
                                <tr>
                                    <th>Start Date</th>
                                    <td>{this.state.event.startDate}</td>
                                </tr>
                                <tr>
                                    <th>End Date</th>
                                    <td>{this.state.event.endDate}</td>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td>{this.state.event.description}</td>
                                </tr>
                                <tr>
                                    <th>Organizer Name</th>
                                    <td>{this.state.event.organizerName}</td>
                                </tr>
                                <tr>
                                    <th>Organizer Contact</th>
                                    <td>{getUser() === null ? <p class="text-danger">You need to Login to view contact number !</p> : this.state.event.organizerContact}</td>
                                </tr>
                                <tr>
                                    <th>Price</th>
                                    <td>{this.state.event.price === 0 ? "Its FREE!" : this.state.event.price}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <Link to="/events" className="btn btn-info">Back to Browsing Events</Link>
                                    </td>
                                    {getUser() === null ? <td></td> : <td>
                                        <Link to="/myEvents" className="btn btn-success">Back to Your Events</Link>
                                    </td>}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >

        )
    }


}


export default EventDetail;
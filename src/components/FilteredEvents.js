import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class FilteredEvents extends Component {

    constructor(props) {
        super(props);

        this.state = {
            events: this.props.events
        }
    }

    render() {
        return (

            <div className="container">
                <div className="row">
                    {this.state.events.map((eventValue, index) => {
                        return (
                            <div key={index} className="col-sm-3 mt-3">
                                <div key={index} className="card rounded border border-success">
                                    <div key={index} className="card-body">
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
            </div>
        )
    }
}


export default FilteredEvents;
import React, { Component } from 'react';
import { getUser } from '../Utils/Common';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Axios from 'axios';
import FilteredEvents from './FilteredEvents';

class EventDetailSearch extends Component {

    constructor(props) {
        super(props);

        this.state = {
            category: "Media and Entertainment",
            type: "Rally",
            startDate: null,
            endDate: null,
            submitError: "",
            events: []
        }
    }



    handleSubmit = (event) => {
        event.preventDefault();

        const reqObject = {
            category: this.state.category,
            type: this.state.type,
            startDate: this.state.startDate,
            endDate: this.state.endDate
        }

        if (this.state.startDate === null || this.state.endDate === null) {
            this.setState({
                submitError: "Please choose a start and end date. Click on submit afterwards."
            });
        }
        else {
            console.log(reqObject);
            Axios.post("http://localhost:3001/events/filter", reqObject)
                .then(res => {
                    console.log(res.data);
                    this.setState({ events: res.data });
                })
                .catch(error => {
                    if (error.response.status === 400 || error.response.status === 500) {
                        this.setState({
                            submitError: error.response.data.message
                        });
                    }
                    else {
                        this.setState({
                            submitError: "Something went wrong. Please try again later."
                        });
                    }
                })

        }

    }


    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({ [name]: value }, () => { console.log(this.state) });
    }


    render() {

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select name="category" className="form-control" onChange={this.handleChange} id="category">
                            <option>Media and Entertainment</option>
                            <option>Food and Drinks</option>
                            <option>Music</option>
                            <option>Religious</option>
                            <option>Fitness and Sports</option>
                            <option>Charity</option>
                            <option>Business</option>
                            <option>School Activities</option>
                            <option>Travel and Explore</option>
                            <option>Visual Arts</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <select name="type" className="form-control" onChange={this.handleChange} id="type">
                            <option>Rally</option>
                            <option>Networking</option>
                            <option>Expo</option>
                            <option>Conference</option>
                            <option>Party</option>
                            <option>Game</option>
                            <option>Gala</option>
                            <option>Retreat</option>
                            <option>Seminar</option>
                            <option>Motivational Talk</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="startDate">Start Date</label>
                        <input type="date" name="startDate"
                            className={`form-control`}
                            id="startDate" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endDate">End Date</label>
                        <input type="date" name="endDate"
                            className={`form-control`}
                            id="endDate" onChange={this.handleChange} />
                    </div>
                    {this.state.submitError && <><div className="alert alert-danger" role="alert">{this.state.submitError}</div><br /></>}<br />
                    {this.state.startDate === null && <><div className="alert alert-danger" role="alert">Choose a Start Date</div><br /></>}<br />
                    {this.state.endDate === null && <><div className="alert alert-danger" role="alert">Choose a End Date</div><br /></>}<br />
                    <button type="submit" className="btn btn-primary">Search</button>
                </form>

                {this.state.events.length > 0 ?
                    <div className="container" style={{ marginTop: 20 }}>
                        <div class="alert alert-success" role="alert">Yayy !! Found the results.</div>
                        <FilteredEvents events={this.state.events} />
                    </div> : ""
                }
            </div>
        )
    }
}





export default EventDetailSearch;
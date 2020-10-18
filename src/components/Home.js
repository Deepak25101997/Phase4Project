import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { getUser } from '../Utils/Common';
class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            events: [],
            searchedEvents: [],
            search: "",
            responseError: ""
        }
    }


    getEvents = () => {
        Axios.get("http://localhost:3001/events")
            .then((res) => {
                const eventsList = res.data;
                console.log(eventsList);
                this.setState({ events: eventsList });
            })
            .catch(err => {
                console.log("There is some error : ", err);
            })
    }


    componentDidMount = () => {
        this.getEvents();
    }

    handleChange = (event) => {
        event.preventDefault();
        const text = event.target.value.toLowerCase();
        if (text.length === 0 || text === "") {
            this.setState({ searchedEvents: [] });
        }
        this.setState({ search: text });

        let filterArray = this.state.events.filter((event) => {
            let tempTitle = event.title.toLowerCase();
            let tempCategory = event.category.toLowerCase();
            let tempType = event.type.toLowerCase();
            let tempLocation = event.location.toLowerCase();
            let tempDescription = event.location.toLowerCase();

            let textTBS = this.state.search;
            return (tempTitle.includes(textTBS) || tempCategory.includes(textTBS) || tempLocation.includes(textTBS)
                || tempType.includes(textTBS) || tempDescription.includes(textTBS))
        })

        this.setState({ searchedEvents: filterArray });
    }

    render() {
        return (
            <div className="container">
                <h1 className="title" style={{ color: "purple", marginTop: "0.5%", fontSize: 30 }}>Welcome {getUser() !== null ? getUser().name : ""} to FindMyEvents.com </h1><br />
                <p className="title" style={{ color: "brown" }}><span style={{ fontWeight: "bold" }}>First time user ? </span>
                SignUp quickly and start using this app for adding/managing your events.</p>
                <p className="title" style={{ color: "brown" }}><span style={{ fontWeight: "bold" }}>Want to see the events directly ?</span> Simple browse through all the
                 events by going through the navigation bar link.</p>
                <p className="title" style={{ color: "brown" }}><span style={{ fontWeight: "bold" }}>You can also search the events by typing in the
                 search bar below.</span> It can contain anything, from your preferred event type to location, and much more.</p>
                <hr></hr>
                <div className="container" style={{ width: "60%" }}>
                    <input className="form-control" onChange={this.handleChange} name="search" type="text" placeholder="Type and Search" />
                </div>

                {this.state.searchedEvents.length > 0 ?
                    <div className="row">
                        {this.state.searchedEvents.map((eventValue, index) => {
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
                    </div> : <h5 style={{ color: "red", textAlign: "center", marginTop: "1%" }}>No Events found !</h5>}

            </div>
        )
    }

}

export default Home;
import React, { Component } from 'react';
import Axios from 'axios';


class EventEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            category: null,
            type: null,
            location: "",
            startDate: null,
            endDate: null,
            description: "",
            organizerName: "",
            organizerContact: 0,
            price: 0,
            submitError: null,
            formErrors: {
                title: "",
                location: "",
                description: "",
                organizerName: "",
                organizerContact: "",
                price: ""
            }
        }
    }


    handleSubmit = (event) => {
        event.preventDefault();

        const reqObject = {
            title: this.state.title,
            category: this.state.category,
            type: this.state.type,
            location: this.state.location,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            description: this.state.description,
            organizerName: this.state.organizerName,
            organizerContact: this.state.organizerContact,
            price: this.state.price
        }

        if (this.state.startDate === null || this.state.endDate === null) {
            this.setState({
                submitError: "Please choose a start and end date. Click on submit afterwards."
            });
        }
        else {
            Axios.put("http://localhost:3001/event/" + this.props.match.params.id, reqObject)
                .then(res => {
                    this.setState({
                        title: res.data.title,
                        category: res.data.category,
                        type: res.data.type,
                        location: res.data.location,
                        startDate: res.data.startDate,
                        endDate: res.data.endDate,
                        description: res.data.description,
                        organizerName: res.data.organizerName,
                        organizerContact: res.data.organizerContact,
                        price: res.data.price
                    })
                    this.props.history.push("/events")
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


    componentDidMount = () => {
        Axios.get('http://localhost:3001/event/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    title: res.data.title,
                    category: res.data.category,
                    type: res.data.type,
                    location: res.data.location,
                    startDate: res.data.startDate,
                    endDate: res.data.endDate,
                    description: res.data.description,
                    organizerName: res.data.organizerName,
                    organizerContact: res.data.organizerContact,
                    price: res.data.price
                })
            })
            .catch(err => console.log("There is some error : " + err));
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let formErrors = this.state.formErrors;

        switch (name) {
            case "title":
                formErrors.title = value.length < 5 || value.length === 0 ? "Minimum 5 characters are required" : "";
                break;
            case "location":
                formErrors.location = value.length < 5 || value.length === 0 ? "Minimum 5 characters are required" : "";
                break;
            case "description":
                formErrors.description = value.length < 50 || value.length === 0 ? "Minimum 50 characters are required" : "";
                break;
            case "organizerName":
                formErrors.organizerName = value.length < 5 || value.length === 0 ? "Minimum 5 characters are required" : "";
                break;
            case "organizerContact":
                formErrors.organizerContact = value.length < 10 || value.length === 0 ? "Minimum 10 characters are required" : "";
                break;
            case "price":
                formErrors.price = value.length < 0 ? "Price cannot be negative !" : "";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value }, () => { console.log(this.state) });
    }


    render() {

        const { formErrors } = this.state;

        return (
            <div className="container" style={{ width: "60%" }}>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title"
                            className={`form-control ${formErrors.title.length > 0 ? "is-invalid" : null}`} id="title"
                            onChange={this.handleChange}
                            value={this.state.title || ''} />
                        {formErrors.title.length > 0 && (<span>{formErrors.title}</span>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select name="category" className="form-control"
                            onChange={this.handleChange} id="category"
                            value={this.state.category || ''}>
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
                        <select name="type" className="form-control"
                            onChange={this.handleChange} id="type"
                            value={this.state.type || ''}>
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
                        <label htmlFor="location">Location</label>
                        <input type="text" name="location"
                            className={`form-control ${formErrors.location.length > 0 ? "is-invalid" : null}`}
                            id="location" onChange={this.handleChange}
                            value={this.state.location || ''} />
                        {formErrors.location.length > 0 && (<span>{formErrors.location}</span>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="startDate">Start Date</label>
                        <input type="date" name="startDate"
                            className={`form-control`}
                            id="startDate" onChange={this.handleChange}
                            value={this.state.startDate || ''} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endDate">End Date</label>
                        <input type="date" name="endDate"
                            className={`form-control`}
                            id="endDate" onChange={this.handleChange}
                            value={this.state.endDate || ''} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description"
                            className={`form-control ${formErrors.description.length > 0 ? "is-invalid" : null}`}
                            onChange={this.handleChange} rows="3"
                            value={this.state.description || ''}></textarea>
                        {formErrors.description.length > 0 && (<span>{formErrors.description}</span>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="organizerName">Organizer Name</label>
                        <input type="text" name="organizerName" id="organizerName"
                            className={`form-control ${formErrors.organizerName.length > 0 ? "is-invalid" : null}`}
                            onChange={this.handleChange}
                            value={this.state.organizerName || ''} />
                        {formErrors.organizerName.length > 0 && (<span>{formErrors.organizerName}</span>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="organizerContact">Organizer Contact</label>
                        <input type="number" name="organizerContact" id="organizerContact"
                            className={`form-control ${formErrors.organizerContact.length > 0 ? "is-invalid" : null}`}
                            onChange={this.handleChange}
                            value={this.state.organizerContact || ''} />
                        {formErrors.organizerContact.length > 0 && (<span>{formErrors.organizerContact}</span>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" id="price"
                            className={`form-control ${formErrors.price.length > 0 ? "is-invalid" : null}`}
                            onChange={this.handleChange}
                            placeholder="Enter '0' if its free"
                            value={this.state.price || ''} />
                        {formErrors.price.length > 0 && (<span>{formErrors.price}</span>)}
                    </div>
                    {this.state.submitError && <><div className="alert alert-danger" role="alert">{this.state.submitError}</div><br /></>}<br />
                    {this.state.startDate === null && <><div className="alert alert-danger" role="alert">Choose a Start Date</div><br /></>}<br />
                    {this.state.endDate === null && <><div className="alert alert-danger" role="alert">Choose a End Date</div><br /></>}<br />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }


}

export default EventEdit;
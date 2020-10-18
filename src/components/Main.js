import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Events from './Events';
import Home from '../components/Home';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import EventAdd from '../components/EventAdd';
import EventDetail from '../components/EventDetail';
import MyEvents from '../components/MyEvents';
import EventEdit from '../components/EventEdit';
import EventDetailSearch from '../components/EventDetailSearch';

import PrivateRoute from '../Utils/PrivateRoute';
import { getToken, removeUserSession, getUser, setUserSession } from '../Utils/Common';
import { get } from 'jquery';



class Main extends Component {

    handleLogout = (event) => {
        event.preventDefault();
        removeUserSession();
        this.forceUpdate();
    }


    handleLogin = (event) => {
        this.forceUpdate();
    }

    render() {
        return (
            <div className="container" style={{ marginTop: 20 }}>
                <Router>
                    <div className="container">
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <Link to={'/'} className="navbar-brand">FindMyEvents</Link>

                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="collapsibleNavbar">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <Link to={'/events'} className="nav-link" style={{ color: "white" }}>Browse Events</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/eventDetailSearch'} className="nav-link" style={{ color: "white" }}>Detailed Search</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/eventAdd'} className="nav-link" style={{ color: "white" }}>Add Event</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/myEvents'} className="nav-link" style={{ color: "white" }}>Your Events</Link>
                                    </li>
                                </ul>
                                <ul className="navbar-nav ml-auto">
                                    {getToken() === null ? <li className="nav-item">
                                        <Link to={'/signUp'} onClick={this.handleLogin} className="nav-link" style={{ color: "white" }}>Sign Up</Link>
                                    </li> : ""}
                                    {getToken() === null ? <li className="nav-item .ml-auto">
                                        <Link to={'/login'} onClick={this.handleLogin} className="nav-link" style={{ color: "white" }}>Login</Link>
                                    </li> : ""}
                                    {getToken() !== null ? <li className="nav-item .ml-auto">
                                        <button onClick={this.handleLogout} className="btn btn-danger" style={{ color: "white" }}>Logout</button>
                                    </li> : ""}
                                </ul>
                            </div>
                        </nav> <br />
                    </div>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/signUp" component={SignUp} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/events" component={Events} />
                        <Route exact path="/eventDetailSearch" component={EventDetailSearch} />
                        <Route exact path="/myEvents" component={MyEvents} />
                        <Route exact path="/eventDetail/:id" component={EventDetail} />
                        <Route exact path="/eventEdit/:id" component={EventEdit} />
                        <PrivateRoute exact path="/eventAdd" component={EventAdd} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default Main;
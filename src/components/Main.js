import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Link, Switch } from 'react-router-dom';
import Events from './Events';
import Home from '../components/Home';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import EventAdd from '../components/EventAdd';
import EventDetail from '../components/EventDetail';
import MyEvents from '../components/MyEvents';
import EventEdit from '../components/EventEdit';

import PrivateRoute from '../Utils/PrivateRoute';
import PublicRoute from '../Utils/PublicRoute';
import { getToken, removeUserSession, getUser, setUserSession } from '../Utils/Common';



class Main extends Component {

    // constructor(props) {
    //     super(props);
    // }

    handleLogout = (event) => {
        event.preventDefault();
        removeUserSession();
        this.forceUpdate();
    }


    render() {
        return (
            <div className="container" style={{ marginTop: 20 }}>
                <Router>
                    <div className="container">
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <Link to={'/'} className="navbar-brand">FindMyEvents</Link>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <Link to={'/events'} className="nav-link">BrowseEvents</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/eventAdd'} className="nav-link">Add Event</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/myEvents'} className="nav-link">Your Events</Link>
                                    </li>
                                </ul>
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link to={'/signUp'} className="nav-link">Sign Up</Link>
                                    </li>
                                    <li className="nav-item .ml-auto">
                                        <Link to={'/login'} className="nav-link">Login</Link>
                                    </li>
                                    <li className="nav-item .ml-auto">
                                        <button onClick={this.handleLogout} className="btn btn-danger">Logout</button>
                                    </li>
                                </ul>
                            </div>
                        </nav> <br />
                    </div>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/signUp" component={SignUp} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/events" component={Events} />
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
import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { getUser } from '../Utils/Common';

class Home extends Component {

    render() {
        return (
            <div>
                <h3>Home</h3>
                {getUser() ? <h1>Hello: {getUser().id} </h1> : ""}
                {getUser() ? <h1>Hello: {getUser().name} </h1> : ""}
            </div>
        )
    }

}

export default Home;
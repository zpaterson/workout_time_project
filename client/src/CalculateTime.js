import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';



export default class CalculateTime extends Component {

    render() {    
        return (
            <div>
                <h1>Great, based your schedule you have: </h1> 
                <h3>{this.props.freeTime} hours of free time this week!</h3>
                <br/>
                <br/>
            </div>
        )

    }
}


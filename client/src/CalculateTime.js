import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';



export default class CalculateTime extends Component {

    render() {    
        return (

            <p>You have {this.props.freeTime} hours of free time this week!</p>
        )

    }
}


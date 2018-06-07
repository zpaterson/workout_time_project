import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Header from './Header';

export default class SuggestedTimes extends Component {
    constructor(props) {
      super(props);
    }
    render() {
        console.log(this.props.freeTime + ' ' + this.props.preferences.hours + ' ' + this.props.preferences.days);

        return (
         <div>
          <Header title="Here's your suggested workout times" />
          </div>
        )
    }
}
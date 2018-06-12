import React, { Component } from 'react';

export default class Header extends Component {
    handleChange() {
        this.props.changeTitle("WorkoutTime");
    }
    render() {
        return (
            <div>
              <h1>{this.props.title}</h1>
              {/* <button onClick={this.handleChange.bind(this)}>Next</button> */}
            </div>
        )
    }
}
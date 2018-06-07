import React, { Component } from 'react';
import Header from "./Header";

export default class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
        }
    }

    changeTitle(title) {
        this.setState({title});
    }

    render() {
        return (
           <div>
            <Header changeTitle={this.changeTitle.bind(this)} title={this.state.title} />
           </div>
        )
    }
}
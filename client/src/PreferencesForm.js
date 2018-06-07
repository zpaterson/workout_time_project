import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import SuggestedTimes from './SuggestedTimes';

export default class PreferencesForm extends Component {
    constructor(props) {
        super(props);
            this.state = { 
            hours: '',
            days: '',
        };
    
    this.handleChangeHours = (event) => {
        this.setState({ 
            hours: event.target.value
        });
        console.log(event.target.value)
    }
    this.handleChangeDays = (event) => {
        this.setState({ 
            days: event.target.value 
        });
        console.log(event.target.value)
    }

    this.handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.hours);
        console.log(this.state.days);
        //this.props.onSubmit(this.state);
    }
}
componentDidMount() {
    //fetch('/preferences').then(res => res.json())
}
render() {
    console.log('my results' + this.props.results);
        return (
            <div>
                <h1>Tell us about when you want to workout</h1>
                <form>
                    <p>Please type how many hours you want to workout this week:</p>
                    <input type="text" name="numOfhours" value={this.state.hours} onChange={this.handleChangeHours}/>
                    <p>Please type how many days you want to workout this week:</p>
                    <input type="text" name="numOfdays" value={this.state.days} onChange={this.handleChangeDays}/>
                    <br/>
                    {/* <Route render={({ history }) => (<button onClick={() => { { this.this.handleSubmit() } history.push('/times') }}>See suggested workout times</button>)} /> */}
                    <button onClick={this.handleSubmit }>Submit</button>
                    <SuggestedTimes freeTime={this.props.results} preferences={this.state} />
                </form>
            </div>
        )
    }
}


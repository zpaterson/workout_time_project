import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import SuggestedTimes from './SuggestedTimes';
import CalculateTime from './CalculateTime';
import Schedule from './schedule';

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
    console.log('PREFENCES');
    // console.log('my results' + this.props.results);
    console.log(this.props.schedule);
        return (
            <div>
                <CalculateTime freeTime={this.props.schedule.totalFreeTimePerWeek} />
                <h1>Tell us about when you want to workout</h1>
                <form>
                    <p>Please type how many hours you want to workout this week:</p>
                    <input type="text" name="numOfhours" value={this.state.hours} onChange={this.handleChangeHours}/>
                    <p>Please type how many days you want to workout this week:</p>
                    <input type="text" name="numOfdays" value={this.state.days} onChange={this.handleChangeDays}/>
                    <br/>
                    {/* <Route render={({ history }) => (<button onClick={() => { { this.this.handleSubmit() } history.push('/times') }}>See suggested workout times</button>)} /> */}
                    <button onClick={this.props.onSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}


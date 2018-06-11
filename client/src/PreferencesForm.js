import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import SuggestedTimes from './SuggestedTimes';
import CalculateTime from './CalculateTime';
import Schedule from './schedule';
import Day from './day';

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
        console.log('handle change hours', event.target.value)
    }
    this.handleChangeDays = (event) => {
        this.setState({ 
            days: event.target.value 
        });
        console.log('handle change days',event.target.value)
    }

    this.handleSubmit = (event) => {
        event.preventDefault();
        console.log("LINE 32 OF PREFERENCES FORM", this.state)
        console.log('line 32 printing schedule data', this.props.schedule);
        console.log(this.state);
        
        console.log(this.state.hours);
        console.log(this.state.days);
        //this.props.onSubmit(this.state);
        
    }
}

componentDidMount() {
    //fetch('/preferences').then(res => res.json())
    console.log('print data from schedule in component did mount' ,this.props.schedule);
    console.log('route to preferences')
}
render() {
    console.log('PREFENCES');
    // console.log('my results' + this.props.results);
    // console.log(this.props.schedule);
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
                    <button onClick={(event)=>{this.handleSubmit(event);this.props.onSubmit(this.state)}}>Submit</button>
                </form>
            </div>
        )
    }
}


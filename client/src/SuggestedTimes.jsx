import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Day from './day';
import Header from './Header';
import moment from 'moment';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {
    withStyles
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    demo: {
        height: 240,
    },
    paper1: {
        padding: theme.spacing.unit * 2,
        height: '200%',
        //textAlign: 'center',
        color: theme.palette.text.primary,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
});

   
class SuggestedTimes extends Component {
    constructor(props) {
      super(props);
        this.state = {
            direction: 'row',
            justify: 'center',
            alignItems: 'center',
        };
    }

    render() {
        const { classes } = this.props;    

        let day = new Day(this.props.fields.hours, this.props.fields.days);
        day.amountOfTimeToWorkoutPerDay(this.props.fields.hours, this.props.fields.days);
        day.groupEventsByDay(this.props.schedule.eventsPerDay);
        console.log(day);

        let days = day.days.map((nameOfDay, index) => (
            <div key={index}>
                <h3>{nameOfDay}</h3>
                <ul>
                    {day.morningWorkout[index] ? <li>Morning: {moment(day.morningWorkout[index]).format("h:mm a")} –– {moment(day.morningWorkoutEndTime[index]).format("h:mm a")} <Button size="small" variant="outlined"
                        color="primary" className={classes.button} onClick={() => this.props.insertEvent(day.morningWorkout[index], day.morningWorkoutEndTime[index])}>Add to Calendar</Button></li> : null}
                    

                    {day.midDayWorkout[index] ? <li>Midday: {moment(day.midDayWorkout[index]).format("h:mm a")} –– {moment(day.midDayWorkoutEndTime[index]).format("h:mm a")} <Button size="small" variant="outlined"
                        color="primary" className={classes.button} onClick={() => this.props.insertEvent(day.midDayWorkout[index], day.midDayWorkoutEndTime[index])}>Add to Calendar</Button></li> : null}
                
                    {day.eveningWorkout[index] ? <li>Evening: {moment(day.eveningWorkout[index]).format("h:mm a")} –– {moment(day.eveningWorkoutEndTime[index]).format("h:mm a")} <Button size="small" variant="outlined"
                        color="primary" className={classes.button} onClick={() => this.props.insertEvent(day.eveningWorkout[index], day.eveningWorkoutEndTime[index])}>Add to Calendar</Button></li>: null}
               </ul>
            </div>
        ));
        console.log(days);
        debugger
        return (
          <div>
            <Grid container className={classes.root}>
                <Grid container  spacing={24}>
                 <Grid item xs={12}>
                    <Paper className={classes.paper1}>
                        <Typography variant="display2">Here's your suggested workout times</Typography>
                        <br/>
                        <Typography variant="subheading">{days}</Typography>
                    </Paper>
                </Grid>
             </Grid>
        </Grid>
      </div>
     )
   }
}

SuggestedTimes.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SuggestedTimes);
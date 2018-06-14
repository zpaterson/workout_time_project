import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {
    withStyles
} from '@material-ui/core/styles';
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
        color: theme.palette.text.secondary,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
});


class PreferencesForm extends Component {
    constructor(props) {
        super(props);
            this.state = { 
            hours: '',
            days: '',
            direction: 'row',
            justify: 'center',
            alignItems: 'center',  
        };
    
    this.handleChangeHours = (event) => {
        this.setState({
            hours: event.target.value,
             days: this.state.days
        });
        // console.log('handle change hours', event.target.value)
        // console.log('state in peferences', this.state)

        this.props.onChange({
            hours: event.target.value,
            days: this.state.days
        })
    }
    this.handleChangeDays = (event) => {
        this.setState({ 
            days: event.target.value 
        });
        console.log('handle change days',event.target.value)
        // console.log('state in peferences',this.state)
        this.props.onChange({
            hours: this.state.hours, 
            days: event.target.value
        })
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
    const { classes } = this.props;    
    console.log('PREFENCES');
    // console.log('my results' + this.props.results);
    // console.log(this.props.schedule);
        return (
            <div>
                 <Grid container className={classes.root}>
                    <Grid container  spacing={24}>
                    <Grid item xs={12}>
                    <Paper className={classes.paper1}>
                    <Typography variant="display2">Tell us about when you want to workout</Typography>
                    <br/>
                    <br/>
                    <form>
                        <Typography variant="subheading"> Please tell us how many hours you'd like to workout this week:</Typography>
                            <input type="text" name="numOfhours" value={this.state.hours} onChange={this.handleChangeHours}/>
                            <br/>
                            <br/>
                        <Typography variant="subheading">Please tells us type how many days you want to workout this week:</Typography>
                            <input type="text" name="numOfdays" value={this.state.days} onChange={this.handleChangeDays}/>
                        <br/>
                             {/* <Route render={({ history }) => (<button onClick={() => { { this.this.handleSubmit() } history.push('/times') }}>See suggested workout times</button>)} /> */}
                        {/* <button onClick={(event)=>{this.handleSubmit(event);this.props.onChange(this.state)}}>Submit</button> */}
                    </form>
                    <br/>
                    <br/>
                    <br/> 
                    <br/> 
                    <br/> 
                    <br/> 
                    <br/> 
                    <br/> 
                </Paper>
                </Grid>
                </Grid>
                </Grid>
            </div>
        )
    }
}

PreferencesForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PreferencesForm);
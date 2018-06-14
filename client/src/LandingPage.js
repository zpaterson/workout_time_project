import React, { Component } from 'react';
import calImage from  './calendar.png'
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
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
        // height: '100%',
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    paper2: {
        padding: theme.spacing.unit * 4,
        height: '100%',
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    calImageStyle: {
        width: '50%'
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
});


class LandingPage extends Component{
    state = {
        direction: 'row',
        justify: 'center',
        alignItems: 'center',
    };
    render() {
        const { classes } = this.props;
        const { alignItems, direction, justify } = this.state;
        return(
            <div>
                <Grid container className={classes.root}>
                    <Grid container  spacing={24}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper1}>
                                <Typography variant="display3">WorkoutTime</Typography> 
                            </Paper>
                            <Paper className={classes.paper2}>
                                <p>WorkoutTime helps you plan your next workout effortlessly. It imports your Google calendar data to calculate your free time, 
                                <br/>and suggests workout times based on your preferences, then you just click to add the suggested workouts that work for you.</p>
                                <div>
                                    <img src={calImage} className={classes.calImageStyle} alt="image of google calendar"/>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
      }
    }

    LandingPage.propTypes = {
        classes: PropTypes.object.isRequired,
    };

    export default withStyles(styles)(LandingPage);
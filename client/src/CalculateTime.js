import React, { Component } from 'react';
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
        height: '300%',
        //textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
});



class CalculateTime extends Component {
     state = {
         direction: 'row',
         justify: 'center',
         alignItems: 'center',
     };

    render() {
        const { classes } = this.props;    
        return (
            <div>
                <Grid container className={classes.root}>
                    <Grid container  spacing={24}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper1}>
                                <Typography variant="display1">Great, based on your schedule you have: </Typography> 
                                <h2>{this.props.freeTime} hours of free time this week!</h2>
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
CalculateTime.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CalculateTime);
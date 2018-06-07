import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  root: theme.mixins.gutters({
    padding: 16,
    paddingBottom: 16,
    margin: theme.spacing.unit * 3,
  }),
});

function VendorShowDetailsBox(props) {
  const { classes } = props;
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">{props.data.name}</Typography>
        <Typography variant="subheading" component="h3">{props.data.street}</Typography>
        <Typography variant="subheading" component="h3">{props.data.city}</Typography>
        <Typography variant="subheading" component="h3">{props.data.phone}</Typography>
        <Typography variant="subheading" component="h3">{props.data.website}</Typography>
      </Paper>
      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">Who to Call:</Typography>
        <Typography variant="subheading" component="h3">Mike Ditka - CEO</Typography>
        <Typography variant="subheading" component="h3">Roquan Smith - Director of Sales</Typography>
      </Paper>
    </div>
  );
}

VendorShowDetailsBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VendorShowDetailsBox);

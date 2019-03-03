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

function UserShowDetailsBox(props) {
  const { classes, data } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">{data.name}</Typography>
        <Typography variant="subheading" component="h3">{data.email}</Typography>
        <Typography variant="subheading" component="h3">{data.title}</Typography>
        <Typography variant="subheading" component="h3">{data.school_name}</Typography>
      </Paper>
    </div>
  );
}

UserShowDetailsBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserShowDetailsBox);

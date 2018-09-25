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

function OrgShowDetailsBox(props) {
  const { classes } = props;
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">{props.data.name}</Typography>
        <Typography variant="subheading" component="h3">{props.data.website}</Typography>
      </Paper>
      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">Current MARVL Users</Typography>

          {props.data.users.map((user) => {
                    return
                      <Typography key={user.name} variant="subheading" component="h3">{user.name}</Typography>
                    }
                )}
      </Paper>
    </div>
  );
}

OrgShowDetailsBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrgShowDetailsBox);

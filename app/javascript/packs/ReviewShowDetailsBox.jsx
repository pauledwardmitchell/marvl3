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

function ReviewShowDetailsBox(props) {
  const { classes, data } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">{data.user_name} from {data.org_name} reviewed the work of {data.vendor_name}</Typography>
        <Typography variant="subheading" component="h3">CATEGORY HERE?</Typography>
      </Paper>
    </div>
  );
}

ReviewShowDetailsBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReviewShowDetailsBox);

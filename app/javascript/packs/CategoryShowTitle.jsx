import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';


const styles = theme => ({
  root: theme.mixins.gutters({
    padding: 16,
    paddingBottom: 16,
    margin: theme.spacing.unit * 3,
  }),
});

function CategoryShowTitle(props) {
  const { classes } = props;
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography variant="display2" align='center'>HVAC</Typography>
      </Paper>
    </div>
  );
}

CategoryShowTitle.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoryShowTitle);




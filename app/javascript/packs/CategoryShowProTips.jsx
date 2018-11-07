import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ScrollableAnchor from 'react-scrollable-anchor';


const styles = theme => ({
  root: theme.mixins.gutters({
    padding: 16,
    margin: theme.spacing.unit * 3,
  }),
  chip: {
    margin: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: -5
  },
});


class CategoryShowProTip extends React.Component {

  render() {
    const { classes } = this.props;

    return (
          <Grid item xs={12} >
            <Paper className={classes.root} elevation={4}>

              <ScrollableAnchor id={'protips'}>
                <Typography variant="display1">
                  Pro Tips about Fencing
                </Typography>
              </ScrollableAnchor>

              <Paper className={classes.root} elevation={4}>
                <ScrollableAnchor id={'fencing-dumpsters'}>
                  <Typography variant="title">
                    Fencing around dumpsters
                  </Typography>
                </ScrollableAnchor>
                <Typography variant="subheading">
                  Hey this is a pro tip about fencing.  We learned all this at the ops directors meeting and thought we should write it down in a place where we can all access it.
                </Typography>
                <Typography variant="body1">
                  Written on: 31 October 2018
                </Typography>
                <Typography variant="body1">
                  Written by: Kermit the Frog
                </Typography>
              </Paper>

              <Paper className={classes.root} elevation={4}>
                <ScrollableAnchor id={'fencing-paint'}>
                  <Typography variant="title">
                    How to get someone to white-wash a fence for you
                  </Typography>
                </ScrollableAnchor>
                <Typography variant="subheading">
                  Hey this is another pro tip about fencing.  We learned all this at the ops directors meeting and thought we should write it down in a place where we can all access it.
                </Typography>
                <Typography variant="body1">
                  Written on: 31 October 2018
                </Typography>
                <Typography variant="body1">
                  Written by: Tom Sawyer
                </Typography>
              </Paper>

            </Paper>
          </Grid>
    );
    }
}

CategoryShowProTip.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoryShowProTip);

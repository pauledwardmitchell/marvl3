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
    const { classes, data } = this.props;

    return (
          <Grid item xs={12} >
            <Paper className={classes.root} elevation={4}>

              <ScrollableAnchor id={'protips'}>
                <Typography variant="display1">
                  Pro Tips about {data[0].category}
                </Typography>
              </ScrollableAnchor>

              {data.map(protip => (
                <Paper className={classes.root} elevation={4} key={protip.id}>
                  <ScrollableAnchor id={'protip' + "-" + protip.category_tag + "-" + protip.id}>
                    <Typography variant="title">
                      {protip.title}
                    </Typography>
                  </ScrollableAnchor>
                  <Typography variant="subheading">
                    {protip.content}
                  </Typography>
                  <Typography variant="body1">
                    Written on: {protip.date_written}
                  </Typography>
                  <Typography variant="body1">
                    Written by: {protip.user}
                  </Typography>
                </Paper>
                  ))}

            </Paper>
          </Grid>
    );
    }
}

CategoryShowProTip.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoryShowProTip);

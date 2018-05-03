import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';


const styles = theme => ({
  root: theme.mixins.gutters({
    padding: 16,
    margin: theme.spacing.unit * 3,
  }),
});


class ExpansionPanelReviews extends React.Component {

  render() {
    const { classes, review } = this.props;

    return (
            <Paper className={classes.root} elevation={4}>
              <Typography variant="subheading">
                {review.vendorName}
              </Typography>
              <Typography variant="body2">
                {review.review}
              </Typography>
            </Paper>
    );
    }
}

ExpansionPanelReviews.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExpansionPanelReviews);

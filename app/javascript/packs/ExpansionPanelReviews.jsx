import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import StarBorder from '@material-ui/icons/StarBorder';



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


class ExpansionPanelReviews extends React.Component {

  render() {
    const { classes, review } = this.props;

    return (
          <Grid item xs={12} >
            <Paper className={classes.root} elevation={4}>
              <Chip
                avatar={<Avatar><StarBorder /></Avatar>}
                className={classes.chip}
                label={review.stars + " / 5"}
                />
              <Button href={'/vendors/' + review.vendorId} size='large' className={classes.button}>{review.vendorName}</Button>
              <Typography variant="body2">
                {review.review}
              </Typography>
              <Typography variant="body1">
                Written on: {review.dateWritten}
              </Typography>
            </Paper>
          </Grid>
    );
    }
}

ExpansionPanelReviews.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExpansionPanelReviews);

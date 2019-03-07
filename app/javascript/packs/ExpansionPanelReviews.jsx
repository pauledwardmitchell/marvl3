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
  smallButton: {
    margin: theme.spacing.unit
  }
});



class ExpansionPanelReviews extends React.Component {

  renderPrivateReview (review) {
    if ( review.private_review_permission === true && review.private_review != null ) {
      return (<Typography variant="body2">
                Private Review: {review.private_review}
              </Typography>)
    } else if (review.private_review_permission === true) {
      return (<Typography variant="body2">
                Private Review: (None given)
              </Typography>)
    } else {
      return <span></span>
    }
  }

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
              <Button id={"vendor-page-button-" + review.vendorId} href={'/vendors/' + review.vendorId} size='large' className={classes.button}>
                {review.vendorName}
              </Button>
              <Typography variant="body2">
                Public Review: {review.review}
              </Typography>
              {this.renderPrivateReview(review)}
              <Typography variant="body1">
                Written on: {review.dateWritten}
              </Typography>
              <Button href={'/reviews/' + review.id} size='small' className={classes.smallButton}>Go to review page</Button>
            </Paper>
          </Grid>
    );
    }
}

ExpansionPanelReviews.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExpansionPanelReviews);

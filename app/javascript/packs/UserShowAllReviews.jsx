import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReactStars from 'react-stars'

import EditReviewDialog from './EditReviewDialog'

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '50%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  stars: {
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 12,
    display: 'block'
  },
  paper: theme.mixins.gutters({
    padding: 16,
    margin: theme.spacing.unit * 3,
  })
});

class UserShowAllReviews extends React.Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  renderEditDialogButton(review) {
    const pageUserId = document.getElementById("theuser").getAttribute('value');
    const sessionUserId = document.getElementById("userid").getAttribute('value');

    if ( pageUserId === sessionUserId ) {
      return ( <EditReviewDialog review={review}/> )
    } else {
      return ( <span></span> )
    }
  }

  render() {
    const { classes, data } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>

        {data.reviews.map(review => (
          <div key={review.id} >
            <ExpansionPanel expanded={expanded === 'panel' + review.id } onChange={this.handleChange('panel' + review.id)}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Review of: {review.vendor_name} on {review.date}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid item xs={12}>
                  <Paper className={classes.paper} elevation={4}>
                    <Typography component="h3" variant='subheading' gutterBottom>Review: {review.review}</Typography>
                    <Typography component="h3" variant='subheading'>Private Review: {review.private_review}</Typography>
                    <ReactStars
                      className={classes.stars}
                      edit={false}
                      count={5}
                      value={review.rating}
                      size={24}
                      color2={'#ffd700'} />
                    <Typography gutterBottom>{review.reviewer} wrote this {review.days_ago} days ago</Typography>
                    {this.renderEditDialogButton(review)}
                  </Paper>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        ))}

      </div>
    );
  }
}

UserShowAllReviews.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserShowAllReviews);

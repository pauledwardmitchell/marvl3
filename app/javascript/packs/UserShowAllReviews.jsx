import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import EditReviewDialog from './EditReviewDialog'

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
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
                <Typography className={classes.secondaryHeading}>{review.review}</Typography>
                <EditReviewDialog review={review}/>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                Whole Shabang in here. Teaser text outside. Even pics in here.  Dynamically render Edit
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

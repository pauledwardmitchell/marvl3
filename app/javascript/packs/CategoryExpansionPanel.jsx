import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ExpansionPanelReviews from './ExpansionPanelReviews'

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

class CategoryExpansionPanels extends React.Component {
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
        {data.map((category) => {
          return <ExpansionPanel key={category.sub_id} expanded={expanded === 'panel' + category.sub} onChange={this.handleChange('panel' + category.sub)}>
                   <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                     <Typography className={classes.heading}>{category.sub}</Typography>
                     <Typography className={classes.secondaryHeading}>{category.reviews.length} Reviews</Typography>
                   </ExpansionPanelSummary>
                   <ExpansionPanelDetails>
                     <Grid container direction='row' spacing={0}>
                       {category.reviews.map(review => (
                          <ExpansionPanelReviews key={review.id} review={review}/>
                       ))}
                     </Grid>
                   </ExpansionPanelDetails>
                 </ExpansionPanel>
          }
        )}
      </div>
    );
  }
}

CategoryExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoryExpansionPanels);

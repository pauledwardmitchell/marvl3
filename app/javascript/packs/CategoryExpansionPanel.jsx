import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
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
          return <ExpansionPanel key={category.sub} expanded={expanded === 'panel' + category.sub} onChange={this.handleChange('panel' + category.sub)}>
                   <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                     <Typography className={classes.heading}>{category.sub}</Typography>
                     <Typography className={classes.secondaryHeading}>{category.reviews.length} Reviews</Typography>
                   </ExpansionPanelSummary>
                   <ExpansionPanelDetails>
                     <Grid container direction='row' spacing={0}>
                       {category.reviews.map(review => (
                          <ExpansionPanelReviews key={review.vendorName} review={review}/>
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

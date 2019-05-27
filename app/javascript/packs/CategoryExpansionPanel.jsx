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

import ExpansionPanelReviews from './ExpansionPanelReviews';
import { WriteReviewDialog } from './WriteReviewDialog';
import UserContext from './UserContext';

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

const writeReviewStyles = theme => ({
  root: {
    visibility: 'visible'
  },
  title: {
    width: 600
  },
  button: {
  },
  formControl: {
    marginBottom: 10
  },
  review: {
    marginBottom: 10
  },
  stars: {
    marginLeft: 50,
    marginTop: 12
  },
  switchAnon: {
    marginTop: 10
  }
});

const WriteReviewDialogButton = withStyles(writeReviewStyles)(WriteReviewDialog);

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
    const { classes, data, superCat, onSubmit } = this.props;
    const { expanded } = this.state;
    const orgId = parseInt(document.getElementById("org").getAttribute('value'));

    return (
      <UserContext.Consumer>
        {
          (user) => {
            return (
              <div className={classes.root}>
                {
                  data.map((category) => {
                    let summary = (
                      <Typography className={classes.secondaryHeading}>{category.reviews.length} Reviews</Typography>
                    );

                    if (category.reviews.length === 0) {
                      if (orgId !== user.organization_id) {
                        return null;
                      }

                      summary = (
                        <WriteReviewDialogButton
                          categoryId={category.sub_id}
                          categoryLabel={superCat ? `${superCat.name} - ${category.sub}` : ''}
                          onSubmit={() => {
                            if (onSubmit) {
                              onSubmit();
                            }
                          }}
                        />
                      );
                    }

                    return (
                      <ExpansionPanel key={category.sub_id} expanded={expanded === 'panel' + category.sub} onChange={this.handleChange('panel' + category.sub)}>
                        <ExpansionPanelSummary id={"category-title-"+category.sub_id} expandIcon={<ExpandMoreIcon />}>
                          <Typography className={classes.heading}>{category.sub}</Typography>
                          {summary}
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          <Grid container direction='row' spacing={0}>
                            {
                              category.reviews.map(review => (
                                <ExpansionPanelReviews key={review.id} review={review}/>
                              ))
                            }
                          </Grid>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    );
                  })
                }
              </div>

            );
          }
        }
      </UserContext.Consumer>
    );
  }
}

CategoryExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoryExpansionPanels);

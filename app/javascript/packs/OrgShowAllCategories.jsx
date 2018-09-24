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

import BuildingAndGroundsCenteredTabs from './BuildingAndGroundsCenteredTabs'
import HumanResourcesCenteredTabs from './HumanResourcesCenteredTabs'

const styles = theme => ({
  root: {
    width: '100%'
  }
});


class OrgShowAllCategories extends React.Component {
  state = {
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="headline">Building and Grounds</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <BuildingAndGroundsCenteredTabs />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="headline">Human Resources</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <HumanResourcesCenteredTabs />
          </ExpansionPanelDetails>
        </ExpansionPanel>

      </div>
    );
  }
}

OrgShowAllCategories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrgShowAllCategories);

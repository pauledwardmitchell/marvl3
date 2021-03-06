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

import BuildingAndGroundsCenteredTabs from './BuildingAndGroundsCenteredTabs';
import HumanResourcesCenteredTabs from './HumanResourcesCenteredTabs';
import TechnologyCenteredTabs from './TechnologyCenteredTabs';
import SuppliesCenteredTabs from './SuppliesCenteredTabs';
import StudentInstructionAndServicesCenteredTabs from './StudentInstructionAndServicesCenteredTabs';

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

        <Grid container spacing={24} justify='center'>
          <Grid item xs={11}>

            <ExpansionPanel>
              <ExpansionPanelSummary id={"building-and-grounds-container"} expandIcon={<ExpandMoreIcon />}>
                <Typography variant="headline">Facilities</Typography>
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

            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="headline">Technology</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <TechnologyCenteredTabs />
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="headline">Supplies</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <SuppliesCenteredTabs />
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="headline">Student Instruction and Student Services</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <StudentInstructionAndServicesCenteredTabs />
              </ExpansionPanelDetails>
            </ExpansionPanel>

          </Grid>
        </Grid>

      </div>
    );
  }
}

OrgShowAllCategories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrgShowAllCategories);

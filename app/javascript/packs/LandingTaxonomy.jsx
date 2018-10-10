import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import BuildingAndGroundsCenteredTabs from './BuildingAndGroundsCenteredTabs';
import HumanResourcesCenteredTabs from './HumanResourcesCenteredTabs';
import TechnologyCenteredTabs from './TechnologyCenteredTabs';
import SuppliesCenteredTabs from './SuppliesCenteredTabs';
import StudentInstructionAndServicesCenteredTabs from './StudentInstructionAndServicesCenteredTabs';

import ScrollableAnchor from 'react-scrollable-anchor';
import axios from 'axios';

const styles = theme => ({
  root: {
    width: '100%'
  }
});

class LandingTaxonomy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <div>
        <Grid container spacing={24} justify='center'>
            <Grid container alignItems='center' direction= 'row' justify= 'center'>
              <ScrollableAnchor id={'taxonomy'}>
                <Typography variant="headline" component="h2" style={{paddingTop: 40, paddingBottom: 20}}>
                  Browse all categories
                </Typography>
              </ScrollableAnchor>
            </Grid>
          <Grid item xs={11}>

            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="headline">Building and Grounds</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <BuildingAndGroundsCenteredTabs landing={true} />
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="headline">Human Resources</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <HumanResourcesCenteredTabs landing={true}/>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="headline">Technology</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <TechnologyCenteredTabs landing={true}/>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="headline">Supplies</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <SuppliesCenteredTabs landing={true}/>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="headline">Student Instruction and Student Services</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <StudentInstructionAndServicesCenteredTabs landing={true}/>
              </ExpansionPanelDetails>
            </ExpansionPanel>

          </Grid>
        </Grid>
        <Divider style={{marginTop: 150}}/>
      </div>
    )
  }
}

LandingTaxonomy.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingTaxonomy);

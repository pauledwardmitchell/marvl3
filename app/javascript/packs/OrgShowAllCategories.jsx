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

import CenteredTabs from './CenteredTabs'

const styles = theme => ({
  root: {
    width: '100%'
  }
});

const data = [ "Super 1", "Super 2", "Super 3", "Super 4"]

class OrgShowAllCategories extends React.Component {
  state = {
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {data.map((category) => {
          return  <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="headline">{category}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <CenteredTabs />
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
          }
        )}


      </div>
    );
  }
}

OrgShowAllCategories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrgShowAllCategories);

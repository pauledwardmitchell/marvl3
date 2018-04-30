import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

import CategoryExpansionPanel from './CategoryExpansionPanel'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});


class CenteredTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange} centered>
            <Tab label="Building / Grounds" />
            <Tab label="Finance" />
            <Tab label="Human Resources" />
            <Tab label="Student Services" />
            <Tab label="Technology" />
            <Tab label="Other" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><CategoryExpansionPanel /></TabContainer>}
        {value === 1 && <TabContainer><CategoryExpansionPanel /></TabContainer>}
        {value === 2 && <TabContainer><CategoryExpansionPanel /></TabContainer>}
        {value === 3 && <TabContainer><CategoryExpansionPanel /></TabContainer>}
        {value === 4 && <TabContainer><CategoryExpansionPanel /></TabContainer>}
        {value === 5 && <TabContainer><CategoryExpansionPanel /></TabContainer>}
      </div>
    );
  }
}

CenteredTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CenteredTabs);

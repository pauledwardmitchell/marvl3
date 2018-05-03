import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

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

const data = [
  {
    "name": "Building and Grounds",
    "subCategories": [
    {
      "sub": "Contractor",
      "reviews": [{
        "vendorName": "Capital Contracting",
        "review": "Lorem ipsum dolor amet 3 wolf moon church-key yr, copper mug art party bushwick woke locavore intelligentsia subway tile kitsch whatever."
      }]
    },
    {
      "sub": "HVAC",
      "reviews": [{
        "vendorName": "Capital HVAC",
        "review": "Amet 3 wolf moon church-key yr, copper mug art party bushwick woke locavore intelligentsia subway tile kitsch whatever."
      }]
    },
    {
      "sub": "Plumber",
      "reviews": [{
        "vendorName": "Capital Plumbing",
        "review": "Ipsum dolor amet 3 wolf moon church-key yr, copper mug art party bushwick woke locavore intelligentsia subway tile kitsch whatever."
      }]
    }]

  },
  {
    "name": "Finance",
    "subCategories": [{
      "sub": "Accountant",
      "reviews": [{
        "vendorName": "Capital Accounting",
        "review": "Lorem ipsum dolor amet 3 wolf moon church-key yr, copper mug art party bushwick woke locavore intelligentsia subway tile kitsch whatever."
      }]
    }]
  },
  {
    "name": "Human Resources",
    "subCategories": [{
      "sub": "Health Insurance",
      "reviews": [{
        "vendorName": "Capital Health",
        "review": "Lorem ipsum dolor amet 3 wolf moon church-key yr, copper mug art party bushwick woke locavore intelligentsia subway tile kitsch whatever."
      }]
    }]
  },
  {
    "name": "Technology",
    "subCategories": [{
      "sub": "Tech Consultant",
      "reviews": [{
        "vendorName": "Capital Consulting",
        "review": "Lorem ipsum dolor amet 3 wolf moon church-key yr, copper mug art party bushwick woke locavore intelligentsia subway tile kitsch whatever."
      }]
    }]
  }
]

class CenteredTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  getCategories() {
    var categories;
    var i;
    for (i = 0; i < data.length; i++) {
      if (this.state.value === i) {
        categories = data[i].subCategories;
      }
    }
    return categories
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={24} justify='center'>
          <Grid item xs={11}>
            <AppBar position="static">
              <Tabs value={value} onChange={this.handleChange} centered>
                {data.map((superCategory) => {
                    return <Tab
                             key={superCategory.name}
                             label={superCategory.name}/>
                    }
                )}
              </Tabs>
            </AppBar>
            {value === 0 && <TabContainer><CategoryExpansionPanel data={this.getCategories()}/></TabContainer>}
            {value === 1 && <TabContainer><CategoryExpansionPanel data={this.getCategories()}/></TabContainer>}
            {value === 2 && <TabContainer><CategoryExpansionPanel data={this.getCategories()}/></TabContainer>}
            {value === 3 && <TabContainer><CategoryExpansionPanel data={this.getCategories()}/></TabContainer>}
          </Grid>
        </Grid>
      </div>
    );
  }
}

CenteredTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CenteredTabs);

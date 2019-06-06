import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import axios from 'axios'

import CategoryExpansionPanel from './CategoryExpansionPanel'
import LandingTaxonomyCategoryList from './LandingTaxonomyCategoryList'

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
    "name": "Loading...",
    "subCategories": [
    {
      "sub": "Loading...",
      "sub_id": 1,
      "reviews": [
      {
        "vendorName": "Loading...",
        "dateWritten": "Loading...",
        "stars": "5",
        "review": "Loading...",
        "id": 1
      }
      ]
    }]
  }
]

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
const thisAxios = axios.create({
  headers: {
    'X-CSRF-Token': csrfToken
  }
});



class BuildingAndGroundsCenteredTabs extends React.Component {
  fetchData = () => {
    var orgId = 0
    if (document.getElementById("org")) {
      orgId = document.getElementById("org").getAttribute('value')
    }

    thisAxios.get('/building_and_grounds?org=' + orgId)
      .then((response) => {
        this.setState({superSuperData: response.data})
      })
      .catch((error) => console.error('axios error', error))
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      superSuperData: data
    };
  }

  componentWillMount(){
    this.fetchData();
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  getCategories() {
    var catData = this.state.superSuperData
    var categories;
    var i;
    for (i = 0; i < catData.length; i++) {
      if (this.state.value === i) {
        categories = catData[i].subCategories;
      }
    }
    return categories
  }

  renderPanel() {
    if (this.props.landing === true) {
      return ( <LandingTaxonomyCategoryList data={this.getCategories()}/> )
    } else {
      const superCat = this.state.superSuperData[this.state.value];
      return (
        <CategoryExpansionPanel
          data={this.getCategories()}
          superCat={superCat}
          onSubmit={this.fetchData.bind(this)} />
      )
    }
  }

  render() {
    const { classes } = this.props;
    const { value, superSuperData } = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={24} justify='center'>
          <Grid item xs={11}>
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={this.handleChange}
                scrollable
                scrollButtons="on"
              >
                {superSuperData.map((superCategory) => {
                    return <Tab
                             key={superCategory.name}
                             label={superCategory.name}/>
                    }
                )}
              </Tabs>
            </AppBar>
            {value === 0 && <TabContainer>{this.renderPanel()}</TabContainer>}
            {value === 1 && <TabContainer>{this.renderPanel()}</TabContainer>}
            {value === 2 && <TabContainer>{this.renderPanel()}</TabContainer>}
            {value === 3 && <TabContainer>{this.renderPanel()}</TabContainer>}
            {value === 4 && <TabContainer>{this.renderPanel()}</TabContainer>}
            {value === 5 && <TabContainer>{this.renderPanel()}</TabContainer>}
            {value === 6 && <TabContainer>{this.renderPanel()}</TabContainer>}
          </Grid>
        </Grid>
      </div>
    );
  }
}

BuildingAndGroundsCenteredTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BuildingAndGroundsCenteredTabs);

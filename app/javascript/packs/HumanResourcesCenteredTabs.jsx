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

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
const thisAxios = axios.create({
  baseURL: 'https://marvl-next.herokuapp.com',
  headers: {
    'X-CSRF-Token': csrfToken
  }
});


class HumanResourcesCenteredTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      superSuperData: data
    };
  }

  componentWillMount(){
    thisAxios.get('/human_resources')
    .then((response) => {
      this.setState({superSuperData: response.data})
    })
    .catch((error) => console.error('axios error', error))
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

  render() {
    const { classes } = this.props;
    const { value, superSuperData } = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={24} justify='center'>
          <Grid item xs={11}>
            <AppBar position="static">
              <Tabs value={value} onChange={this.handleChange} centered>
                {superSuperData.map((superCategory) => {
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
          </Grid>
        </Grid>
      </div>
    );
  }
}

HumanResourcesCenteredTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HumanResourcesCenteredTabs);


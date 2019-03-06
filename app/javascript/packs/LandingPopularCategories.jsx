import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LabelIcon from '@material-ui/icons/Label';

import ScrollableAnchor from 'react-scrollable-anchor';
import axios from 'axios';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  root: {
    width: '100%'
  },
  label: {
    textDecoration: 'none',
  }
});

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
const thisAxios = axios.create({
  headers: {
    'X-CSRF-Token': csrfToken
  }
});

const loadingData = [
  {
    id: 1,
    name: "Loading",
    num_reviews: 10
  }
]


class LandingPopularCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: loadingData
    };
  }

  componentWillMount(){

    thisAxios.get('/landing_popular_categories')
    .then((response) => {
      this.setState({data: response.data})
    })
    .catch((error) => console.error('axios error', error))
  }

  buildLink(category_id) {
    return "/categories/" + category_id
  }

  render () {
    const { classes } = this.props;

    return (
      <div>
        <Grid container spacing={24} justify='center'>
            <Grid container alignItems='center' direction= 'row' justify= 'center'>
              <ScrollableAnchor id={'popular-categories'}>
                <Typography variant="headline" component="h2" style={{paddingTop: 40, paddingBottom: 20}}>
                  Browse categories with the most reviews:
                </Typography>
              </ScrollableAnchor>
            </Grid>
          <Grid item xs={8}>

            <Paper>
              <Grid container spacing={24} justify='center'>
                <Grid container alignItems='center' direction= 'row' justify= 'center'>
                {this.state.data.map((category) => {
                  return  <a key={category.id} href={this.buildLink(category.id)} className={classes.label}>
                            <ListItem button key={category.id}>
                              <ListItemIcon>
                                <LabelIcon />
                              </ListItemIcon>
                              <ListItemText primary={category.name} secondary={category.num_reviews + " Reviews"} />
                            </ListItem>
                          </a>
                  }
                )}
                </Grid>
              </Grid>
            </Paper>

          </Grid>
        </Grid>
        <Divider style={{marginTop: 150}}/>
      </div>
    )
  }
}

LandingPopularCategories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingPopularCategories);

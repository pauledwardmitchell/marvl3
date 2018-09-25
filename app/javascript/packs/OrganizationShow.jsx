import React from 'react'

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';


import ButtonAppBar from './ButtonAppBar'
import OrgShowAllCategories from './OrgShowAllCategories'
import OrgShowDetailsBox from './OrgShowDetailsBox'
import OrgShowMap from './OrgShowMap'
import ChipsArray from './ChipsArray'

import axios from 'axios'

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
const thisAxios = axios.create({
  baseURL: 'https://marvl-next.herokuapp.com',
  headers: {
    'X-CSRF-Token': csrfToken
  }
});

const loadingOrgData =
  {name: 'Loading...',
   website: 'Loading...',
   users: [ {name: 'Loading...'} ]
  }

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class OrganizationShow extends React.Component {
  constructor(props) {
    super(props);
    // this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    // this.getDrawerStatus = this.getDrawerStatus.bind(this);
    this.state = {
      orgData: loadingOrgData
    };
  }

  componentWillMount(){
    thisAxios.get('/org_show_data')
      .then((response) => {
        this.setState({orgData: response.data})
      })
    .catch((error) => console.error('axios error', error))
  }


  render () {
    const { classes } = this.props;
    const { orgData } = this.state;

    return (
      <div>
        <ButtonAppBar />
        <Grid container direction='row' justify='flex-start' spacing={16}>
          <Grid item xs={4}>
            <OrgShowMap />
          </Grid>
          <Grid item xs={5}>
            <OrgShowDetailsBox data={orgData} />
          </Grid>
          <Grid item xs={3}>
            <ChipsArray />
          </Grid>
        </Grid>
        <OrgShowAllCategories />
      </div>
    )
  }
}

export default withStyles(styles)(OrganizationShow);

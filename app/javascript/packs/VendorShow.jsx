import React from 'react'

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';


import ButtonAppBar from './ButtonAppBar'
import CenteredTabs from './CenteredTabs'
import VendorShowDetailsBox from './VendorShowDetailsBox'
import OrgShowMap from './OrgShowMap'
import VendorShowCategoriesTags from './VendorShowCategoriesTags'
import EnhancedTable from './EnhancedTable'

import axios from 'axios'

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
const thisAxios = axios.create({
  baseURL: 'https://marvl-next.herokuapp.com',
  headers: {
    'X-CSRF-Token': csrfToken
  }
});

const loadingData =
  {name: 'Amazing HVAC',
   street: '800 N. Halsted Street',
   city: 'Chicago, IL 60612',
   phone: '(312) 222-1234',
   website: 'www.amazing-hvac.com'
  }

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class VendorShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: loadingData
    };
  }

  componentDidMount() {
    var vendorId = document.getElementById("vendor").getAttribute('value')

    thisAxios.get('/vendor_show_data?vendor=' + vendorId)
    .then((response) => {
      console.log(response.data)
      this.setState({data: response.data})
    })
    .catch((error) => console.error('axios error', error))
  }


  render () {
    const { classes } = this.props;
    const { data } = this.state;

    return (
      <div>
        <ButtonAppBar />
        <Grid container direction='row' justify='flex-start' spacing={16}>
          <Grid item xs={4}>
            <OrgShowMap />
          </Grid>
          <Grid item xs={4}>
            <VendorShowDetailsBox data={data} />
          </Grid>
          <Grid item xs={3}>
            <VendorShowCategoriesTags />
          </Grid>
        </Grid>
        <Divider />
        <div className={classes.root}>
          <Grid container spacing={24} justify='center'>
            <Grid item xs={11}>
              <EnhancedTable />
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(VendorShow);

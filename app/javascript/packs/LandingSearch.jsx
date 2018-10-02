import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IntegrationAutosuggest from './IntegrationAutosuggest'

import axios from 'axios'

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
const thisAxios = axios.create({
  baseURL: 'https://marvl-next.herokuapp.com',
  headers: {
    'X-CSRF-Token': csrfToken
  }
});

const styles = theme => ({
});

const loadingSearchData = [
        { label: 'Composting', type: 'categories', id: 1 },
        { label: 'Computers - Staff', type: 'categories', id: 2 },
        { label: 'Computers - Students', type: 'categories', id: 3 },
        { label: 'Custom Industrial Kitchens', type: 'vendors', id: 4 },
        { label: 'Capital City Contracting', type: 'vendors', id: 5 }
      ]

class LandingSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchData: loadingSearchData
    };
  }

  componentWillMount(){
    thisAxios.get('/landing_search_data')
      .then((response) => {
        this.setState({searchData: response.data})
      })
    .catch((error) => console.error('axios error', error))
  }

  render () {
    return (
      <div style={{paddingTop: 140, paddingBottom: 20}}>
        <Grid container alignItems='center' direction= 'row' justify= 'center'>
          <Typography variant="headline" component="h1" style={{paddingTop: 40, paddingBottom: 20}}>
            MARVL
          </Typography>
        </Grid>
        <IntegrationAutosuggest data={this.state.searchData}/>
        <Divider style={{marginTop: 150}}/>
      </div>
    )
  }
}

export default withStyles(styles)(LandingSearch);

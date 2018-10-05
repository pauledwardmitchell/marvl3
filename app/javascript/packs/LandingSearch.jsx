import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IntegrationAutosuggest from './IntegrationAutosuggest'
import IntegrationReactSelect from './IntegrationReactSelect'

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


class LandingSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <div style={{paddingTop: 140, paddingBottom: 20}}>
        <Grid container alignItems='center' direction= 'row' justify= 'center'>
          <Typography variant="headline" component="h1" style={{paddingTop: 40, paddingBottom: 20}}>
            MARVL
          </Typography>
        </Grid>
        <IntegrationReactSelect />
        <Divider style={{marginTop: 150}}/>
      </div>
    )
  }
}

export default withStyles(styles)(LandingSearch);

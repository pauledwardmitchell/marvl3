import React from 'react'

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import IntegrationAutosuggest from './IntegrationAutosuggest'


export default class LandingSearch extends React.Component {

  render () {
    return (
      <div style={{paddingTop: 140, paddingBottom: 20}}>
        <Grid container alignItems='center' direction= 'row' justify= 'center'>
          <Typography variant="headline" component="h1" style={{paddingTop: 40, paddingBottom: 20}}>
            MARVL
          </Typography>
        </Grid>
        <Grid container
              alignItems='flex-start'
              direction= 'row'
              justify= 'center'>
          <Grid item xs={7}>
            <IntegrationAutosuggest data={this.props.data}/>
          </Grid>
          <Grid item xs={1} >
            <Button>SEARCH</Button>
          </Grid>
        </Grid>
        <Divider style={{marginTop: 150}}/>
      </div>
    )
  }
}

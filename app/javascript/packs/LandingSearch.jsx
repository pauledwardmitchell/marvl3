import React from 'react'

import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

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
            <IntegrationAutosuggest style={{}} categories={this.props.categories} vendors={this.props.vendors} tests={this.props.tests}/>
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

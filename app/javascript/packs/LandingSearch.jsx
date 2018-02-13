import React from 'react'

import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';

import IntegrationAutosuggest from './IntegrationAutosuggest'


export default class LandingSearch extends React.Component {

  render () {
    return (

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

    )
  }
}

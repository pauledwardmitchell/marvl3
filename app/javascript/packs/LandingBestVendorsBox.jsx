import React from 'react'

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import LandingCategoryCard from './LandingCategoryCard'

export default class LandingBestVendorsBox extends React.Component {

  render () {
    return (
      <div>
        <Grid container alignItems='center' direction= 'row' justify= 'center'>
          <Typography variant="headline" component="h2" style={{paddingTop: 40, paddingBottom: 20}}>
            Find the best vendors
          </Typography>
        </Grid>
        <Grid container alignItems='center' direction= 'row' justify= 'center'>
          <LandingCategoryCard type='bus'/>
          <LandingCategoryCard type='computers'/>
          <LandingCategoryCard type='security'/>
        </Grid>
        <Divider style={{marginTop: 150}}/>
      </div>
    )
  }
}

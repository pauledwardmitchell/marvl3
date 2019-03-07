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
  headers: {
    'X-CSRF-Token': csrfToken
  }
});

const styles = theme => ({
  title: {
    paddingTop: 140,
    paddingBottom: 100
  },
  divider: {
    marginTop: 150
  }
});


class LandingSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {

    const { classes } = this.props;

    return (
      <div>
        <Grid container alignItems='center' direction= 'row' justify= 'center'>
          <a href="/" className={classes.title}>
            <img src="https://cordepress.com/wp-content/uploads/2019/03/marvl_owl.png" alt="marvl_logo" height="150"></img>
          </a>
        </Grid>

        <IntegrationReactSelect />
        <Divider className={classes.divider}/>
      </div>
    )
  }
}

export default withStyles(styles)(LandingSearch);

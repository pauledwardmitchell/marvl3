import React from 'react'

import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';


import ButtonAppBar from './ButtonAppBar'
import CenteredTabs from './CenteredTabs'
import OrgShowDetailsBox from './OrgShowDetailsBox'
import OrgShowMap from './OrgShowMap'

import axios from 'axios'

const orgData =
  {name: 'Noble Street PCS - UIC Campus',
   street: '800 N. Halsted Street',
   city: 'Chicago, IL 60612',
   phone: '(312) 222-1234',
   website: 'www.noblestreetpcs.com/uic'
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
    // this.state = {
    //   categoriesData: [],
    //   testData: [
    //     { label: 'Composting' },
    //     { label: 'Computers - Staff' },
    //     { label: 'Computers - Students' },
    //     { label: 'Custom Industrial Kitchens' },
    //     { label: 'Capital City Contracting' }
    //   ],
    //   searchTerm: "",
    //   drawerOpen: false,
    //   categoryShowOpen: false
    // };
  }

  componentDidMount() {
    axios.get(`https://marvl-next.herokuapp.com/landing_search_data`)
      .then((response) => {
        this.setState({categoriesData: response.data.categories})
      })
      .catch((error) => console.error('axios error', error))
  }


  render () {
    const { classes } = this.props;

    return (
      <div>
        <ButtonAppBar />
        <Grid container direction='row' justify='flex-start' spacing={16}>
          <Grid item xs={6}>
            <OrgShowDetailsBox data={orgData} />
          </Grid>
          <Grid item xs={6}>
            <OrgShowMap />
          </Grid>
        </Grid>
        <Divider style={{marginTop: 150}}/>
        <CenteredTabs />
      </div>
    )
  }
}

export default withStyles(styles)(OrganizationShow);
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
import VendorShowDetailsBox from './VendorShowDetailsBox'
import CategoriesChart from './CategoriesChart'
import VendorShowCategoriesTags from './VendorShowCategoriesTags'
import EnhancedTable from './EnhancedTable'

import axios from 'axios'

const vendorData =
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

class CategoryShow extends React.Component {
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
          <Grid item xs={4}>
            <CategoriesChart />
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.root} elevation={4}>
              <Typography variant="headline" component="h3">HVAC Vendors</Typography>
            </Paper>
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

export default withStyles(styles)(CategoryShow);

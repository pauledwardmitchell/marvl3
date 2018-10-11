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
import CategoriesChart from './CategoriesChart'
import CategoryShowBatchRfp from './CategoryShowBatchRfp'
import CategoryShowEnhancedTable from './CategoryShowEnhancedTable'
import CategoryShowTitle from './CategoryShowTitle'

import axios from 'axios'

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
const thisAxios = axios.create({
  baseURL: 'https://marvl-next.herokuapp.com',
  headers: {
    'X-CSRF-Token': csrfToken
  }
});

const loadingData =
  { name: 'HVAC',
    vendors: [
      { id: 1,
        name: 'Amazing HVAC',
        avg_rating: 4.5,
        schools_array: ['Friendship', 'E.L. Haynes'],
        reviews_count: 6
      }
   ]
  }

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class CategoryShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: loadingData
    };
  }

  componentWillMount(){
    thisAxios.get('/category_show_data')
    .then((response) => {
      console.log(response.data)
      this.setState({data: loadingData})
    })
    .catch((error) => console.error('axios error', error))
  }


  render () {
    const { data } = this.state
    const { classes } = this.props;

    return (
      <div>
        <ButtonAppBar />
        <Grid container direction='row' justify='flex-start' spacing={16}>
          <Grid item xs={4}>
            <CategoriesChart data={data} />
          </Grid>
          <Grid item xs={4}>
            <CategoryShowTitle />
          </Grid>
          <Grid item xs={3}>
            <CategoryShowBatchRfp />
          </Grid>
        </Grid>
        <Divider />
        <div className={classes.root}>
          <Grid container spacing={24} justify='center'>
            <Grid item xs={11}>
              <CategoryShowEnhancedTable />
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(CategoryShow);

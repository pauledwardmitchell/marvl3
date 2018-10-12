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
      },
      { id: 2,
        name: 'Blah HVAC',
        avg_rating: 4.0,
        schools_array: ['Friendship', 'E.L. Haynes'],
        reviews_count: 3
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
    var catId = document.getElementById("category").getAttribute('value')

    thisAxios.get('/category_show_data?category=' + catId)
    .then((response) => {
      console.log(response.data)
      this.setState({data: response.data})
    })
    .catch((error) => console.error('axios error', error))
  }

  buildTableData(vendorsData) {
    var data =[];
    var i;
    for (i = 0; i < vendorsData.length; i++) {
      var counter = i + 1;
      var vendorName = vendorsData[i].name;
      var avgRating = vendorsData[i].avg_rating;
      var schoolsContracted = vendorsData[i].schools_array.join(" ");
      var numReviews = vendorsData[i].reviews_count
      var row = {id: counter, vendorName, avgRating, schoolsContracted, numReviews}
      data.push(row)
    }

    var sortedData = data.sort((a, b) => (a.vendorName < b.vendorName ? -1 : 1))
    return sortedData
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
            <CategoryShowTitle data={data} />
          </Grid>
          <Grid item xs={3}>
            <CategoryShowBatchRfp data={data} />
          </Grid>
        </Grid>
        <Divider />
        <div className={classes.root}>
          <Grid container spacing={24} justify='center'>
            <Grid item xs={11}>
              <CategoryShowEnhancedTable data={this.buildTableData(data)} />
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(CategoryShow);

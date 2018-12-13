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
import OrgShowMap from './OrgShowMap'
import VendorShowCategoriesTags from './VendorShowCategoriesTags'
import EnhancedTable from './EnhancedTable'

import axios from 'axios'

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
const thisAxios = axios.create({
  baseURL: 'https://marvl-next.herokuapp.com',
  headers: {
    'X-CSRF-Token': csrfToken
  }
});

const loadingData =
  {name: 'Amazing HVAC',
   street: '800 N. Halsted Street',
   city_stat_and_zip: 'Chicago, IL 60612',
   website: 'www.amazing-hvac.com',
   categories_array: ["Facilities - Third-Party Facilities Contracting"],
   schools_array: ['Jones PCS', 'Young PCS'],
   point_people_array: [
     { id: 1,
       name_and_title: "Loading...",
       phone: "Loading...",
       email: "Loading..."
     }
   ]
  }

const loadingReviewsData = {
  reviews: [
    { id: 1,
      school_name: 'Loading...',
      rating: 5,
      review: 'Loading...',
      reviewer: 'Loading...',
      days_ago: 100

    }
  ]
}


const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class VendorShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: loadingData,
      reviewsData: loadingReviewsData
    };
  }

  componentDidMount() {
    var vendorId = document.getElementById("vendor").getAttribute('value')

    thisAxios.get('/vendor_show_data?vendor=' + vendorId)
    .then((response) => {
      console.log(response.data)
      this.setState({data: response.data})
    })
    .catch((error) => console.error('axios error', error))
  }

  buildTableData(reviewsData) {
    var data =[];
    var i;
    for (i = 0; i < reviewsData.length; i++) {
      var counter = i + 1;
      var schoolName = reviewsData[i].school_name;
      var rating = reviewsData[i].rating;
      var review = reviewsData[i].review;
      var reviewer = reviewsData[i].reviewer;
      var daysAgo = reviewsData[i].days_ago;

      var row = {id: counter, schoolName, rating, review, reviewer, daysAgo}
      data.push(row)
    }

    var sortedData = data.sort((a, b) => (a.daysAgo < b.daysAgo ? -1 : 1))
    return sortedData
  }

  render () {
    const { classes } = this.props;
    const { data, reviewsData } = this.state;

    return (
      <div>
        <ButtonAppBar />
        <Grid container direction='row' justify='center' spacing={16}>
          <Grid item xs={6}>
            <VendorShowDetailsBox data={data} />
          </Grid>
          <Grid item xs={3}>
            <VendorShowCategoriesTags data={data} />
          </Grid>
        </Grid>
        <Divider />
        <div className={classes.root}>
          <Grid container spacing={24} justify='center'>
            <Grid item xs={11}>
              <EnhancedTable data={this.buildTableData(reviewsData.reviews)}/>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(VendorShow);

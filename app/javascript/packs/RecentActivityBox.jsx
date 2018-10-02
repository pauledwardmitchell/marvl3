import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import RecentActivityCard from './RecentActivityCard'

import axios from 'axios'

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
const thisAxios = axios.create({
  baseURL: 'https://marvl-next.herokuapp.com',
  headers: {
    'X-CSRF-Token': csrfToken
  }
});

const loadingRecentActivityData = [
  { initials: "P",
    school: "Noble Street PCS",
    date: "January 21, 2018",
    img: "http://simpsoncoulter.com/wp-content/uploads/2015/06/2015-06-Interior-Gym.jpg",
    area: "Gym Floor",
    text: "We recently refinished our gym floor.  We considered three vendors for the job...",
    id: 1
  },
  { initials: "M",
    school: "Jones College Prep",
    date: "February 1, 2018",
    img: "https://www.partitionsandstalls.com/images/dynamicslideshow/slides/partitions-and-stalls.jpg",
    area: "Bathroom Stalls",
    text: "Up until last year, our building had the original stalls in the bathrooms.  We came...",
    id: 2
  },
  { initials: "J",
    school: "Walter Peyton PCS",
    date: "March 2, 2018",
    img: "https://ssl.c.photoshelter.com/img-get/I0000RcN9uz0ykkk/s/700/700/Boiler-Room-Furnace-Ice.jpg",
    area: "Boiler",
    text: "Our bioler was ancient, and was costing us a fortune to fix ad hoc.  We replaced it...",
    id: 3
  }
]

const styles = theme => ({
  title: {
    paddingTop: 40,
    paddingBottom: 20
  }
});

class RecentActivityBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recentActivityData: loadingRecentActivityData
    };
  }

  componentWillMount(){
    thisAxios.get('/landing_recent_activity_data')
      .then((response) => {
        this.setState({recentActivityData: response.data})
      })
    .catch((error) => console.error('axios error', error))
  }

  render () {
    const { classes } = this.props;
    const { recentActivityData } = this.state;

    return (
      <div>
        <Grid container alignItems='center' direction= 'row' justify= 'center'>
          <Typography variant="headline" component="h2" className= {classes.title} >
            Recent Activity
          </Typography>
        </Grid>
        <Grid container
              alignItems='center'
              direction= 'row'
              justify= 'center'>
          {recentActivityData.map(post => (
            <RecentActivityCard post={post} key={post.id} />
            ))}
        </Grid>
      </div>

    )
  }
}

export default withStyles(styles)(RecentActivityBox);

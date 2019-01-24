import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import RecentActivityCard from './RecentActivityCard'

import axios from 'axios'

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
const thisAxios = axios.create({
  headers: {
    'X-CSRF-Token': csrfToken
  }
});

const loadingRecentActivityData = [
]

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    paddingTop: 40,
    paddingBottom: 20
  },
  card: {
    padding: theme.spacing.unit * 2,
    height: '100%',
    color: theme.palette.text.secondary,
  },
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
              justify='center'
              className={classes.root}>
          <Grid item xs={10}>
            <Grid container
                  spacing={8}
                  alignItems='center'
                  direction='row'
                  justify='center' >
                {recentActivityData.map(post => (
                  <Grid item xs={4} key={post.id}>
                    <RecentActivityCard post={post} className={classes.card} />
                  </Grid>
                  ))}
            </Grid>
          </Grid>
        </Grid>
      </div>

    )
  }
}

export default withStyles(styles)(RecentActivityBox);

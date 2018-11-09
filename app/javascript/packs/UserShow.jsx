import React from 'react'

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import ButtonAppBar from './ButtonAppBar'
import UserShowAllReviews from './UserShowAllReviews'
import UserShowDetailsBox from './UserShowDetailsBox'
import UserPointsChart from './UserPointsChart'
import OrgShowLogo from './OrgShowLogo'

import axios from 'axios'

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
const thisAxios = axios.create({
  baseURL: 'https://marvl-next.herokuapp.com',
  headers: {
    'X-CSRF-Token': csrfToken
  }
});

const loadingOrgData =
  {name: 'Loading...',
   school_name: 'Loading...',
   logo_link: "https://static1.squarespace.com/static/58f3a21f59cc68f36175d419/t/58f3a38bebbd1a9ee47f1778/1536187527091/?format=300w",
   points: 100,
   reviews: [ { id: 1, name: 'Loading...' } ],
   protips: [ { } ]
  }


const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class UserShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: loadingOrgData
    };
  }

  componentWillMount(){
    const userId = document.getElementById("theuser").getAttribute('value')

    thisAxios.get('/user_show_data?user=' + userId)
      .then((response) => {
        this.setState({userData: response.data})
      })
    .catch((error) => console.error('axios error', error))
  }


  render () {
    const { classes } = this.props;
    const { userData } = this.state;

    return (
      <div>
        <ButtonAppBar />
        <Grid container direction='row' justify='flex-start' spacing={16}>
          <Grid item xs={3}>
            <OrgShowLogo logo_link={userData.logo_link}/>
          </Grid>
          <Grid item xs={5}>
            <UserShowDetailsBox data={userData} />
          </Grid>
          <Grid item xs={3}>
            <UserPointsChart points={userData.points} />
          </Grid>
        </Grid>
        <Grid container direction='row' justify='center' spacing={16}>
          <Grid item xs={10}>
            <UserShowAllReviews data={userData} />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(UserShow);

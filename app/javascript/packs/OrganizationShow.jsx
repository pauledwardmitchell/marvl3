import React from 'react'

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';


import ButtonAppBar from './ButtonAppBar'
import OrgShowAllCategories from './OrgShowAllCategories'
import OrgShowDetailsBox from './OrgShowDetailsBox'
import OrgShowLogo from './OrgShowLogo'
import ChipsArray from './ChipsArray'
import UserContext from './UserContext'

import axios from 'axios'

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
const thisAxios = axios.create({
  headers: {
    'X-CSRF-Token': csrfToken
  }
});

const loadingOrgData =
  {name: 'Loading...',
   website: 'Loading...',
   logo_link: "https://static1.squarespace.com/static/58f3a21f59cc68f36175d419/t/58f3a38bebbd1a9ee47f1778/1536187527091/?format=300w",
   users: [ { name: 'Loading...' } ]
  }


const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class OrganizationShow extends React.Component {
  fetchUser = () => {
    thisAxios.get('/check_for_user')
      .then((response) => {
        this.setState({currentUser: response.data})
      })
      .catch((error) => console.error('axios error', error))
  }

  constructor(props) {
    super(props);
    this.state = {
      orgData: loadingOrgData,
      currentUser: {}
    };
  }

  componentWillMount(){
    this.fetchUser();

    const orgId = document.getElementById("org").getAttribute('value')

    thisAxios.get('/org_show_data?org=' + orgId)
      .then((response) => {
        this.setState({orgData: response.data})
      })
    .catch((error) => console.error('axios error', error))
  }


  render () {
    const { classes } = this.props;
    const { orgData, currentUser } = this.state;

    return (
      <div>
        <UserContext.Provider value={currentUser}>
          <ButtonAppBar />
          <Grid container direction='row' justify='flex-start' spacing={16}>
            <Grid item xs={3}>
              <OrgShowLogo logo_link={orgData.logo_link}/>
            </Grid>
            <Grid item xs={5}>
              <OrgShowDetailsBox data={orgData} />
            </Grid>
          </Grid>
          <OrgShowAllCategories />
        </UserContext.Provider>
      </div>
    )
  }
}

export default withStyles(styles)(OrganizationShow);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import WriteReviewDialog from './WriteReviewDialog'
import AddVendorDialog from './AddVendorDialog'
import AddProtipDialog from './AddProtipDialog'
import SearchModal from './SearchModal'
import LandingProfileMenu from './LandingProfileMenu'

import axios from 'axios'

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  link: {
    marginLeft: 200,
    textDecoration: 'inherit',
    color: 'inherit'
  }
};

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
const thisAxios = axios.create({
  headers: {
    'X-CSRF-Token': csrfToken
  }
});

class ButtonAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { id: null }
    };
  }


  componentWillMount(){
    thisAxios.get('/check_for_user')
    .then((response) => {
      console.log(response.data)
      this.setState({currentUser: response.data})
    })
    .catch((error) => console.error('axios error', error))
  }

  renderProfileMenu() {
    const { classes } = this.props;
    if (this.state.currentUser === null) {
      return (
        <div></div>
      )
    } else {
      return (
        <LandingProfileMenu email={this.state.currentUser.email} />
      )
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>


              <WriteReviewDialog />
              <AddVendorDialog existingVendors={this.state.existingVendors} />
              <AddProtipDialog />
              <Typography variant="title" color="inherit" className={classes.flex}>
                <a id={"home-button"} href='/' className={classes.link}>
                  MARVL
                </a>
              </Typography>



              <SearchModal />
              <Button color="inherit" href="/">Home Page</Button>
              <Button color="inherit" href={'/users/'+this.state.currentUser.id}>My Profile</Button>
              <Button color="inherit" href="/confirm_signout">Sign Out</Button>

          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);

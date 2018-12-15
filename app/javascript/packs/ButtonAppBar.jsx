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
import LandingProfileMenu from './LandingProfileMenu'

import axios from 'axios'

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  link: {
    marginLeft: 160,
    textDecoration: 'inherit',
    color: 'inherit'
  }
};

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
const thisAxios = axios.create({
  baseURL: 'https://marvl-next.herokuapp.com',
  headers: {
    'X-CSRF-Token': csrfToken
  }
});

class ButtonAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      existingVendors: [{name: 'Loading', id: 1}]
    };
  }

  componentDidMount(){
    thisAxios.get('/check_for_user',{
    })
    .then((response) => {
      if(response.data.email){
        this.setState({
          currentUser: response.data
        })
        console.log(response.data.email)
        console.log(response.data)
        console.log(this.state.currentUser)
      } else {
        this.setState({
          currentUser: null
        })
        console.log("no user")
      }
    })
    .catch((error) => {
      console.log(error);
    })

    thisAxios.get('/existing_vendors')
      .then((response) => {
        this.setState({existingVendors: response.data})
      })
    .catch((error) => console.error('axios error', error))
  }

  handleLoginClick() {
    this.setState({loginModalOpen: true})
  }

  handleLoginSubmitClick() {
    thisAxios.post(`/reviews`, {
        title: 'Test Review',
        content: 'It is working!'
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // renderSignUp() {
  //   const { classes } = this.props;
  //   if (this.state.currentUser === null) {
  //     return (
  //       <SignupModal />
  //     )
  //   } else {
  //     return (
  //       <LandingProfileMenu email={this.state.currentUser.email} />
  //     )
  //   }
  // }

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

  // renderLogIn() {
  //   if (this.state.currentUser === null) {
  //     return (
  //       <LoginModal />
  //     )
  //   } else {
  //     return (
  //       <div></div>
  //     )
  //   }
  // }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>

            <WriteReviewDialog />
            <AddVendorDialog existingVendors={this.state.existingVendors} />
            <AddProtipDialog />

              <Typography variant="title" color="inherit" align="justify" className={classes.flex}>
                <a href='/' className={classes.link}>
                  MARVL
                </a>
              </Typography>

            {this.renderSignUp}

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

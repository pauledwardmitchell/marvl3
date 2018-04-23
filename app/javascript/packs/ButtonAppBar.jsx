import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import LoginModal from './LoginModal'
import SignupModal from './SignupModal'
import LandingProfileMenu from './LandingProfileMenu'

import axios from 'axios'

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
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
      loginModalOpen: false,
      signupModalOpen: false,
      currentUser: null
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
  }

  handleWriteReviewClick() {
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

  renderSignUp() {
    const { classes } = this.props;
    if (this.state.currentUser === null) {
      return (
        <SignupModal open={this.state.signupModalOpen} />
      )
    } else {
      return (
        <LandingProfileMenu email={this.state.currentUser.email} />
      )
    }
  }

  renderLogIn() {
    if (this.state.currentUser === null) {
      return (
        <LoginModal open={this.state.loginModalOpen} />
      )
    } else {
      return (
        <div></div>
      )
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" onClick={this.handleWriteReviewClick}>Write a Review</Button>

            <Typography variant="title" color="inherit" className={classes.flex}>
            </Typography>

            {this.renderSignUp()}
            {this.renderLogIn()}

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

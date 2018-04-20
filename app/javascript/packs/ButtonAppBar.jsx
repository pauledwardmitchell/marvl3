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

import axios from 'axios'

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
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
    .then(function(response){
      if(response.data.email){
        that.setState({
          currentUser: response.data.email
        })
      } else {
        that.setState({
          currentUser: null
        })
      }
    })
    .catch(function(error){
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


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" onClick={this.handleWriteReviewClick}>Write a Review</Button>
            <Typography type="title" color="inherit" className={classes.flex}>
            </Typography>

            <SignupModal open={this.state.signupModalOpen} />
            <LoginModal open={this.state.loginModalOpen} />
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

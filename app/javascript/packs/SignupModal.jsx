import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

import SimpleSnackbar from './SimpleSnackbar'

import axios from 'axios'

const styles = theme => ({
  paper: {
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
});

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
const thisAxios = axios.create({
  headers: {
    'X-CSRF-Token': csrfToken
  }
});


class SignupModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
    this.handleCloseSuccessSnackbar = this.handleCloseSuccessSnackbar.bind(this);
    this.handleCloseErrorSnackbar = this.handleCloseErrorSnackbar.bind(this);

    this.state = {
      open: true,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      showPassword: false,
      successSnackbarOpen: false,
      errorSnackbarOpen: false
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  // handleClose = () => {
  //   this.setState({ open: false });
  // };

  handleFirstNameChange = event => {
    this.setState({ firstName: event.target.value })
  }

  handleLastNameChange = event => {
    this.setState({ lastName: event.target.value })
  }

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPasssword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleSignupSubmit() {
    const userEmail = this.state.email
    const userPassword = this.state.password
    let that = this

    thisAxios.post(`/users`, {
      user: {
        email: userEmail,
        password: userPassword
      }
    })
    .then(function (response) {
      console.log(response);
      that.setState({ successSnackbarOpen: true })
      that.handleClose()
    })
    .catch(function (error) {
      console.log(error);
      that.setState({ errorSnackbarOpen: true })
    });
  }

  handleCloseSuccessSnackbar() {
    this.setState({ successSnackbarOpen: false });
  }

  handleCloseErrorSnackbar() {
    this.setState({ errorSnackbarOpen: false });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className={classes.paper}>
            <Grid container alignItems='center' direction= 'column' justify= 'center' style={{marginBottom: 20}}>
              <Typography variant="title" id="simple-modal-description">
                Sign up for MARVL
              </Typography>
              <Typography variant="subheading" id="simple-modal-description">
                Already signed up? <a href='/users/sign_in'>Log in</a>
              </Typography>
            </Grid>
            <FormGroup>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="first-name-simple">First Name</InputLabel>
              <Input id="first-name-simple" value={this.state.firstName} onChange={this.handleFirstNameChange} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="last-name-simple">Last Name</InputLabel>
              <Input id="last-name-simple" value={this.state.lastName} onChange={this.handleLastNameChange} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="email-simple">Email</InputLabel>
              <Input id="email-simple" value={this.state.email} onChange={this.handleEmailChange} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="adornment-password"
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.password}
                onChange={this.handlePasswordChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={this.handleClickShowPasssword}
                      onMouseDown={this.handleMouseDownPassword}
                    >
                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button color="inherit" onClick={this.handleSignupSubmit}>Sign up</Button>
            </FormGroup>
          </div>
        </Modal>
        <SimpleSnackbar closeSnackbar={this.handleCloseSuccessSnackbar} open={this.state.successSnackbarOpen} message="You are all signed up!"/>
        <SimpleSnackbar closeSnackbar={this.handleCloseErrorSnackbar} open={this.state.errorSnackbarOpen} message="Oops! Something went wrong. Did you remember to use your school email? Please contact Paul, MARVL mechanic, at paul@cpa.coop with any questions."/>
      </div>
    );
  }
}

SignupModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignupModal);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';

import { FormGroup, FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';

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
  baseURL: 'https://marvl-next.herokuapp.com',
  headers: {
    'X-CSRF-Token': csrfToken
  }
});


class SignupModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);

    this.state = {
      open: false,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      showPassword: false
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

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

    thisAxios.post(`/users`, {
      user: {
        email: userEmail,
        password: userPassword
      }
    })
    .then(function (response) {
      console.log(response);
      this.setState({ open: false });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button color="inherit" onClick={this.handleOpen}>Sign up</Button>
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
      </div>
    );
  }
}

SignupModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignupModal);

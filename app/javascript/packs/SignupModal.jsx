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
import IntegrationReactSelect from './IntegrationReactSelect'

import axios from 'axios'

const styles = theme => ({
  paper: {
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: theme.spacing.unit * 70,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  button: {
    paddingTop: 20,
    paddingBottom: 20
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  formControlTall: {
    margin: theme.spacing.unit,
    paddingTop: theme.spacing.unit
  },
  heading: {
    marginBottom: 20
  },
  select: {
    marginTop: 30,
    marginBottom: 20
  }
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

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      organizationId: null,
      password: '',
      passwordConfirmation: '',
      showPassword: false,
      showPasswordConfirmation: false,
      submitDisabled: true,
      signature: ''
    };
  }

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
    this.setState({ password: event.target.value }, () => this.submitButtonEnabledYet() );
  };

  handlePasswordConfirmationChange = event => {
    this.setState({ passwordConfirmation: event.target.value }, () => this.submitButtonEnabledYet() );
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPasssword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleClickShowPassswordConfirmation = () => {
    this.setState({ showPasswordConfirmation: !this.state.showPasswordConfirmation });
  };

  handleSignatureChange = event => {
    this.setState({ signature: event.target.value }, () => this.submitButtonEnabledYet() );
  };

  handleOrganizationChange = (id) => {
    this.setState( { organizationId: id }, () => this.submitButtonEnabledYet() );
  }

  handleSignupSubmit() {
    const userEmail = this.state.email
    const firstName = this.state.firstName
    const lastName = this.state.lastName
    const organizationId = this.state.organizationId
    const password = this.state.password
    const passwordConfirmation = this.state.passwordConfirmation
    let that = this

    thisAxios.post(`/users`, {
      user: {
        email: userEmail,
        first_name: firstName,
        last_name: lastName,
        organization_id: organizationId,
        password: password,
        password_confirmation: passwordConfirmation
      }
    })
    .then(function (response) {
      console.log(response);
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
      // that.setState({ errorSnackbarOpen: true })
    });
  }

  // handleCloseSuccessSnackbar() {
  //   this.setState({ successSnackbarOpen: false });
  // }

  // handleCloseErrorSnackbar() {
  //   this.setState({ errorSnackbarOpen: false });
  // }

  submitButtonEnabledYet() {
    const { password, passwordConfirmation, signature, organizationId } = this.state;

    if (password != passwordConfirmation || signature != "I affirm" || organizationId === null) {
      this.setState({ submitDisabled: true })
    } else {
      this.setState({ submitDisabled: false })
    }
  }

  render() {
    const { classes } = this.props;

    return (
          <div className={classes.paper}>
            <Grid container alignItems='center' direction= 'column' justify= 'center' className={classes.heading} style={{marginBottom: 20}}>
              <Typography variant="title" id="simple-modal-description">
                Sign up for MARVL
              </Typography>
              <Typography variant="subheading" id="simple-modal-description">
                Already signed up? <a href='/users/sign_in'>Log in</a>
              </Typography>
            </Grid>
            <FormGroup>
            <FormControl id="first-name-simple" className={classes.formControl}>
              <InputLabel htmlFor="first-name-simple">First Name</InputLabel>
              <Input value={this.state.firstName} onChange={this.handleFirstNameChange} />
            </FormControl>
            <FormControl id="last-name-simple" className={classes.formControl}>
              <InputLabel htmlFor="last-name-simple">Last Name</InputLabel>
              <Input value={this.state.lastName} onChange={this.handleLastNameChange} />
            </FormControl>
            <FormControl id="email-simple" className={classes.formControl}>
              <InputLabel htmlFor="email-simple">Email</InputLabel>
              <Input value={this.state.email} onChange={this.handleEmailChange} />
            </FormControl>
            <FormControl id="choose-organization" className={classes.select}>
              <IntegrationReactSelect signupForm={true} handleOrganizationChange={this.handleOrganizationChange} />
            </FormControl>
            <FormControl id="password" className={classes.formControl}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
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
            <FormControl id="password-confirmation" className={classes.formControl}>
              <InputLabel htmlFor="password">Confirm your Password</InputLabel>
              <Input
                type={this.state.showPasswordConfirmation ? 'text' : 'password'}
                value={this.state.passwordConfirmation}
                onChange={this.handlePasswordConfirmationChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={this.handleClickShowPassswordConfirmation}
                      onMouseDown={this.handleMouseDownPassword}
                    >
                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl id="signature-simple" className={classes.formControlTall}>
              <InputLabel htmlFor="signature-simple">
                Type "I affirm" to agree to MARVL Terms and Conditions.
              </InputLabel>
              <Input value={this.state.signature} onChange={this.handleSignatureChange} />
            </FormControl>
            <Typography variant="subheading" id="simple-modal-description">
                <a href='/terms_and_conditions' target="_blank">MARVL Terms and Conditions</a>
              </Typography>
            <Button id="sign-up" color="inherit" disabled={this.state.submitDisabled} onClick={this.handleSignupSubmit} className={classes.button}>
              Sign up
            </Button>
            </FormGroup>
            <Grid container alignItems='flex-start' direction= 'column' justify= 'center'>
              <Typography variant="subheading" id="no-confirmation-instructions">
                Did not receive confirmation instructions? <a href='/users/confirmation/new'>Resend</a>
              </Typography>
            </Grid>
          </div>
    );
  }
}

SignupModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignupModal);

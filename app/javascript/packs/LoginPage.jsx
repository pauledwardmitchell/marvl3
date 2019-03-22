import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Checkbox from '@material-ui/core/Checkbox';

import SimpleSnackbar from './SimpleSnackbar'

import axios from 'axios'

const styles = theme => ({
  paper: {
    position: 'absolute',
    top: '10%',
    left: 0,
    right: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 100,
    width: theme.spacing.unit * 70,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  button: {
    marginTop: 20,
    marginBottom: 20
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

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      remeberMe: false,
      showPassword: false,
      error: null
    };
  }

  updateEmail(event) {
    this.setState({ email: event.target.value });
  }

  updatePassword(event) {
    this.setState({ password: event.target.value });
  }

  updateRememberMe(event) {
    this.setState({ rememberMe: event.target.checked });
  }

  togglePassword() {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  }

  clearError() {
    this.setState({ error: null });
  }


  submit() {
    const { email, password, rememberMe } = this.state;

    this.clearError();

    thisAxios.post(`/users/sign_in.json`, {
      user: {
        email,
        password,
        remember_me: rememberMe
      }
    })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);

        const error = err.response.data['error'];
        this.setState({ error });
      });
  }

  render() {
    const { classes } = this.props;
    const { email, password, rememberMe, showPassword, error } = this.state;

    return (
      <div className={classes.paper}>
        <SimpleSnackbar
          open={!!error}
          closeSnackbar={this.clearError.bind(this)}
          message={error} />
        <Grid
          container
          alignItems='center'
          direction= 'column'
          justify= 'center'
          className={classes.heading}
          style={{marginBottom: 20}}
        >
          <Typography variant="title" id="simple-modal-description">
            Log in to MARVL
          </Typography>
        </Grid>
        <FormGroup>
          <FormControl id="email" className={classes.formControl}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input value={email} onChange={this.updateEmail.bind(this)} />
          </FormControl>

          <FormControl id="password" className={classes.formControl}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={this.updatePassword.bind(this)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={this.togglePassword.bind(this)} >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl id="rememberMe" className={classes.formControl}>
            <FormControlLabel
              control={
                <Checkbox checked={rememberMe} onChange={this.updateRememberMe.bind(this)} />
              }
              label="Remember me"
            />
          </FormControl>

          <Typography variant="subheading">
            By signing in, you are agreeing to follow&nbsp;
            <a href='/terms_and_conditions' target="_blank">
              MARVL's Terms and Conditions
            </a>.
          </Typography>

          <Button
            color="inherit"
            variant="outlined"
            onClick={this.submit.bind(this)}
            className={classes.button}
          >
            Log in
          </Button>
        </FormGroup>

        <Grid container alignItems="flex-start" direction="column" justify="center">
          <Typography variant="subheading">
            <a href="/users/sign_up">Sign up</a>
          </Typography>
          <Typography variant="subheading">
            <a href="/users/password/new">Forgot your password?</a>
          </Typography>
          <Typography variant="subheading">
            Did not receive confirmation instructions? <a href="/users/confirmation/new">Resend</a>
          </Typography>
        </Grid>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);

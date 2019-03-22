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

class ForgotPasswordPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      remeberMe: false,
      showPassword: false,
      msg: null
    };
  }

  updateEmail(event) {
    this.setState({ email: event.target.value });
  }

  clearMessage() {
    this.setState({ message: null });
  }

  submit() {
    const { email } = this.state;

    this.clearMessage();

    thisAxios.post(`/users/password.json`, {
      user: {
        email
      }
    })
      .then((res) => {
        console.log(res);

        this.setState({ message: 'Password reset instructions were sent to your email.' });
      })
      .catch((err) => {
        console.log(err);

        const errors = err.response.data['errors'];
        const message = Object.entries(errors).map(([key, values]) => {
          return values.map((value) => `${key} ${value}`)
        }).flat().join(', ');

        this.setState({ message });
      });
  }

  render() {
    const { classes } = this.props;
    const { email, message } = this.state;

    return (
      <div className={classes.paper}>
        <SimpleSnackbar
          open={!!message}
          closeSnackbar={this.clearMessage.bind(this)}
          message={message} />
        <Grid
          container
          alignItems="center"
          direction="column"
          justify="center"
          className={classes.heading}
          style={{marginBottom: 20}}
        >
          <Typography variant="title">
            Need to reset your password?
          </Typography>
        </Grid>
        <FormGroup>
          <FormControl id="email" className={classes.formControl}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input value={email} onChange={this.updateEmail.bind(this)} />
          </FormControl>

          <Button
            color="inherit"
            variant="outlined"
            onClick={this.submit.bind(this)}
            className={classes.button}
          >
            Send me reset password instructions
          </Button>
        </FormGroup>

        <Grid container alignItems="flex-start" direction="column" justify="center">
          <Typography variant="subheading">
            <a href="/users/sign_in">Log in</a>
          </Typography>
          <Typography variant="subheading">
            <a href="/users/sign_up">Sign up</a>
          </Typography>
          <Typography variant="subheading">
            Did not receive confirmation instructions? <a href="/users/confirmation/new">Resend</a>
          </Typography>
        </Grid>
      </div>
    );
  }
}

ForgotPasswordPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ForgotPasswordPage);

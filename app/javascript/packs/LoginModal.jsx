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

import SimpleSnackbar from './SimpleSnackbar'

import axios from 'axios'
import htmlparser2 from 'htmlparser2'


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


class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleCloseSuccessSnackbar = this.handleCloseSuccessSnackbar.bind(this);
    this.handleCloseErrorSnackbar = this.handleCloseErrorSnackbar.bind(this);

    this.state = {
      open: false,
      email: '',
      password: '',
      showPassword: false,
      successSnackbarOpen: false,
      errorSnackbarOpen: false,
      alertMessage: ''
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

  handleLoginSubmit() {
    const userEmail = this.state.email
    const userPassword = this.state.password
    const alerts = []
    let that = this

    var htmlparser = require("htmlparser2");
    const parser = new htmlparser.Parser({
      ontext: function(text){
        if (text.length > 6) {
          alerts.push(text)
          console.log("-->", text);
        }
      }
    }, {decodeEntities: true, recognizeSelfClosing: true });


    thisAxios.post(`/users/sign_in`, {
      user: {
        email: userEmail,
        password: userPassword
      }
    })
    .then(function (response) {
      console.log(response);
      parser.write(response.data)
      that.setState({ alertMessage: alerts[0] })
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
        <Button color="inherit" onClick={this.handleOpen}>Login</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className={classes.paper}>
            <Grid container alignItems='center' direction= 'column' justify= 'center' style={{marginBottom: 20}}>
              <Typography variant="title" id="simple-modal-description">
                Login to MARVL
              </Typography>
              <Typography variant="subheading" id="simple-modal-description">
                New to MARVL? <a href=''>Sign up</a>
              </Typography>
            </Grid>
            <FormGroup>
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
            <Button color="inherit" onClick={this.handleLoginSubmit}>Login</Button>
            </FormGroup>
            <Typography variant="caption" gutterBottom align="right">
              <a href=''>Forgot Password?</a>
            </Typography>
          </div>
        </Modal>
        <SimpleSnackbar closeSnackbar={this.handleCloseSuccessSnackbar} open={this.state.successSnackbarOpen} message={this.state.alertMessage}/>
        <SimpleSnackbar closeSnackbar={this.handleCloseErrorSnackbar} open={this.state.errorSnackbarOpen} message={this.state.alertMessage}/>
      </div>
    );
  }
}

LoginModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginModal);


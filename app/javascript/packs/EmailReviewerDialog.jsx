import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';

import { withStyles } from '@material-ui/core/styles';

import SimpleSnackbar from './SimpleSnackbar'

import axios from 'axios';


const styles = theme => ({
  box: {
    minHeight: 200,
    minWidth: 400
  }
});

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
const thisAxios = axios.create({
  headers: {
    'X-CSRF-Token': csrfToken,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

//needs following props:
// -reviewer first name, last name, email,
// -review, vendor name
// -current user first name, last name, email


class EmailReviewerDialog extends React.Component {
  state = {
    open: false,
    message: `Hey there! I would love to be in touch about the following MARVL review you wrote.`,
    snackbarMessage: null
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  resetForm = () => {
    this.setState({ message: `Hey there! I would love to be in touch about the following MARVL review you wrote.` });
  }

  handleMessageChange = () => {
    this.setState({ message: event.target.value })
  }

  handleEmailSubmit = () => {
    const userId = document.getElementById("userid").getAttribute('value')
    const {message, snackbarMessage} = this.state;
    const that = this;

    thisAxios.post(`//what route here? how to make it email the sender and not the app?`, {
      // email: { what structure does this need to be?
      //   title: title,
      //   content: content,
      //   category_id: categoryId,
      //   user_id: userId,
      // }
    })
    .then((response) => {
      console.log(response);
      that.handleClose()
      that.resetForm()

      that.setState({
        snackbarMessage: [
          'Email was sucessfully sent. ',
        ]
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button id="mailto_button" variant="outlined" color="primary" href={`mailto:?to=${this.props.data.user_email}&body=Hi there! I would love to be in touch about the following MARVL review you wrote about ${this.props.data.vendor_name}: ${this.props.data.public_review}.`}>
          Email {this.props.data.user_name} about this review
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(EmailReviewerDialog);

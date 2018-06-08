import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

import { withStyles } from '@material-ui/core/styles';

import IntegrationAutosuggest from './IntegrationAutosuggest'


const styles = theme => ({
  root: {
    visibility: 'visible'
  }
});

class WriteReviewDialog extends React.Component {
  state = {
    open: false,
    anonymous: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleAnonChange = event => {
    this.setState({ anonymous: !this.state.anonymous });
  };

  anonLabel = () => {
    if (this.state.anonymous === false) {
      return "Posting Publically"
    } else {
      return "Posting Anonymously"
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button onClick={this.handleClickOpen}>Write Review</Button>
        <Dialog
          className={classes.root}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Write a review</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText>

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
                <Typography>{this.anonLabel()}</Typography>
                <Switch
                  checked={this.state.anonymous}
                  onChange={this.handleAnonChange}
                  value="anonymous"
                  color="primary"
                />
              </FormControl>

              <FormControl className={classes.formControl}>
                <IntegrationAutosuggest tests={[ { label: 'Composting' }, { label: 'Computers - Staff' } ]}/>
              </FormControl>

            </FormGroup>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(WriteReviewDialog);

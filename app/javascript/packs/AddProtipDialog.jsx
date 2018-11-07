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
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

import { withStyles } from '@material-ui/core/styles';

import IntegrationReactSelect from './IntegrationReactSelect'

import axios from 'axios'


const styles = theme => ({
  root: {
    visibility: 'visible'
  },
  title: {
    width: 600
  },
  button: {
    margin: theme.spacing.unit,
    color: 'white'
  },
  review: {
    marginBottom: 10
  },
  select: {
    marginTop: 30,
    marginBottom: 20
  }
});

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
const thisAxios = axios.create({
  baseURL: 'https://marvl-next.herokuapp.com',
  headers: {
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': '*',
    // 'Access-Control-Allow-Headers': '*',
    'X-CSRF-Token': csrfToken,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

class AddProtipDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleProtipSubmit = this.handleProtipSubmit.bind(this);

    this.state = {
      open: false,
      submitDisabled: true,
      title: '',
      content: '',
      categoryId: null,
      userId: 1
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  resetForm = () => {
    this.setState({ title: '' });
    this.setState({ content: '' });
    this.setState({ categoryId: null });
    this.setState({ userId: 1 });
  }

  handleCategoryChange = (id) => {
    this.setState( { categoryId: id }, () => this.submitButtonEnabledYet() );
  }

  handleTitleChange = event => {
    this.setState({ title: event.target.value }, () => this.submitButtonEnabledYet() );
  };

  handleContentChange = event => {
    this.setState({ content: event.target.value }, () => this.submitButtonEnabledYet() );
  };

  handleProtipSubmit() {
    const {title, content, categoryId, userId} = this.state;
    const that = this;

    thisAxios.post(`/protips`, {
      protip: {
        title: title,
        content: content,
        category_id: categoryId,
        user_id: userId,
      }
    })
    .then((response) => {
      console.log(response);
      that.handleClose()
      that.resetForm()
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  submitButtonEnabledYet() {
    const {title, content, categoryId, userId} = this.state;

    const inputs = [
      title,
      content
    ]

    if (inputs.map(input => input.length > 0).includes(false) || categoryId === null) {
      this.setState({ submitDisabled: true })
    } else {
      this.setState({ submitDisabled: false })
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button variant="outlined" className={classes.button} onClick={this.handleClickOpen}>Add Pro Tip</Button>
        <Dialog
          className={classes.root}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" className={classes.title}>Add a pro tip</DialogTitle>
          <DialogContent>
            <DialogContentText>
            </DialogContentText>

            <FormGroup>

              <FormControl className={classes.select}>
                <IntegrationReactSelect protipForm={true} handleCategoryChange={this.handleCategoryChange} />
              </FormControl>

              <FormControl className={classes.review}>
                <TextField
                  required
                  id="multiline-flexible"
                  label="Pro Tip Title"
                  multiline
                  rowsMax="10"
                  value={this.state.title}
                  onChange={this.handleTitleChange}
                />
              </FormControl>

              <FormControl className={classes.review}>
                <TextField
                  id="multiline-flexible"
                  label="Pro Tip Content"
                  multiline
                  rowsMax="10"
                  value={this.state.content}
                  onChange={this.handleContentChange}
                />
              </FormControl>

            </FormGroup>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button disabled={this.state.submitDisabled} onClick={this.handleProtipSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(AddProtipDialog);

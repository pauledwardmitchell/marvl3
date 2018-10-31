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

import ReactStars from 'react-stars'
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

class AddVendorDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleVendorSubmit = this.handleVendorSubmit.bind(this);

    this.state = {
      open: false,
      submitDisabled: true,
      vendorName: '',
      vendorWebsite: '',
      vendorStreetAddress: '',
      vendorCityStateZip: '',
      categoryId: null,
      pointPersonName: '',
      pointPersonPhone: '',
      pointPersonEmail: ''
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  resetForm = () => {
    this.setState({ vendorName: '' });
    this.setState({ vendorWebsite: '' });
    this.setState({ vendorStreetAddress: '' });
    this.setState({ vendorCityStateZip: '' });
    this.setState({ vendorId: null });
    this.setState({ categoryId: null });
    this.setState({ pointPersonName: '' });
    this.setState({ pointPersonPhone: '' });
    this.setState({ pointPersonEmail: '' });
  }

  handleCategoryChange = (id) => {
    this.setState()
    this.setState( { categoryId: id }, () => this.submitButtonEnabledYet() );
  }

  handleVendorNameChange = event => {
    this.setState({ vendorName: event.target.value }, () => this.submitButtonEnabledYet() );
  };

  handleVendorWebsiteChange = event => {
    this.setState({ vendorWebsite: event.target.value }, () => this.submitButtonEnabledYet() );
  };

  handleVendorStreetAddressChange = event => {
    this.setState({ vendorStreetAddress: event.target.value }, () => this.submitButtonEnabledYet() );
  };

  handleVendorCityStateZipChange = event => {
    this.setState({ vendorCityStateZip: event.target.value }, () => this.submitButtonEnabledYet() );
  };

  handlePointPersonNameChange = event => {
    this.setState({ pointPersonName: event.target.value }, () => this.submitButtonEnabledYet() );
  };

  handlePointPersonPhoneChange = event => {
    this.setState({ pointPersonPhone: event.target.value }, () => this.submitButtonEnabledYet() );
  };

  handlePointPersonEmailChange = event => {
    this.setState({ pointPersonEmail: event.target.value }, () => this.submitButtonEnabledYet() );
  };

  handleVendorSubmit() {
    const {vendorName, vendorWebsite, vendorStreetAddress, vendorCityStateZip, categoryId, pointPersonName, pointPersonPhone, pointPersonEmail} = this.state;
    const that = this;
    var vendorId = null
    var vendorId = null

    thisAxios.post(`/vendors`, {
      vendor: {
        name: vendorName,
        website: vendorWebsite,
        street: vendorStreetAddress,
        city_state_and_zip: vendorCityStateZip,
      }
    })
    .then((response) => {
      console.log(response);
      return thisAxios.post(`/offerings`, {
        offering: {
          vendor_id: response.data.id,
          category_id: categoryId
        }
      });

      that.handleClose()
      that.resetForm()
    })
    .then((response) => {
      console.log(response);
      return thisAxios.post(`/point_people`, {
        point_person: {
          name: pointPersonName,
          email: pointPersonPhone,
          phone: pointPersonEmail,
          vendor_id: response.data.vendor_id
        }
      });
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
    const {vendorName, vendorWebsite, vendorStreetAddress,  vendorCityStateZip, categoryId, pointPersonName, pointPersonPhone, pointPersonEmail} = this.state;

    const inputs = [
      vendorName,
      vendorWebsite,
      vendorStreetAddress,
      vendorCityStateZip,
      pointPersonName,
      pointPersonPhone,
      pointPersonEmail
    ]

    if (inputs.map(input => input.length > 0).includes(false) || categoryId === null) {
      this.setState({ submitDisabled: true })
    } else {
      this.setState({ submitDisabled: false })
    }
  }

  renderExistingVendorsWarning() {
    var searchTerm = this.state.vendorName;
    var vendors = this.props.existingVendors;
    var i;
    if (searchTerm.length > 4) {
      var matches = []
      for (i = 0; i < vendors.length; i++) {
        if (vendors[i].name.toUpperCase().indexOf(searchTerm.toUpperCase()) > -1) {
          var match = {name: vendors[i].name, id: vendors[i].id}
          matches.push(match)
        }
      }
        if (matches.length > 1) {
          return (
            <div>
              <Typography variant='subheading' align='center'>Here are some existing vendors that match yours.</Typography>
              {vendors
                .filter((vendor) => vendor.name.toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0)
                .map((vendor) => {
                  return (
                    <Button key={vendor.id}  href={`/vendors/${vendor.id}`}>{vendor.name}</Button>
                  )
                })
              }
            </div>
          )
        } else {
          return (
            <Typography variant='subheading' align='center'>This vendor is new to MARVL! High five!</Typography>
          )
        }

    } else {
      return( <div></div> )
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button variant="outlined" className={classes.button} onClick={this.handleClickOpen}>Add a Vendor</Button>
        <Dialog
          className={classes.root}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" className={classes.title}>Add a vendor</DialogTitle>
          <DialogContent>
            <DialogContentText>
            </DialogContentText>

            <FormGroup>

              {this.renderExistingVendorsWarning()}

              <FormControl className={classes.review}>
                <TextField
                  required
                  id="multiline-flexible"
                  label="Vendor Name"
                  multiline
                  rowsMax="10"
                  value={this.state.vendorName}
                  onChange={this.handleVendorNameChange}
                />
              </FormControl>

              <FormControl className={classes.review}>
                <TextField
                  id="multiline-flexible"
                  label="Vendor Website"
                  multiline
                  rowsMax="10"
                  value={this.state.vendorWebsite}
                  onChange={this.handleVendorWebsiteChange}
                />
              </FormControl>

              <FormControl className={classes.review}>
                <TextField
                  label="Street Address (Include Suite # if applicable)"
                  value={this.state.vendorStreetAddress}
                  onChange={this.handleVendorStreetAddressChange}
                />
              </FormControl>

              <FormControl className={classes.review}>
                <TextField
                  label="City, State Zip Code"
                  value={this.state.vendorCityStateZip}
                  onChange={this.handleVendorCityStateZipChange}
                />
              </FormControl>

              <FormControl className={classes.select}>
                <IntegrationReactSelect vendorForm={true} handleCategoryChange={this.handleCategoryChange} />
              </FormControl>

              <FormControl className={classes.review}>
                <TextField
                  label="Point Person Name"
                  value={this.state.pointPersonName}
                  onChange={this.handlePointPersonNameChange}
                />
              </FormControl>

              <FormControl className={classes.review}>
                <TextField
                  label="Point Person Phone"
                  value={this.state.pointPersonPhone}
                  onChange={this.handlePointPersonPhoneChange}
                />
              </FormControl>

              <FormControl className={classes.review}>
                <TextField
                  label="Point Person Email"
                  value={this.state.pointPersonEmail}
                  onChange={this.handlePointPersonEmailChange}
                />
              </FormControl>

            </FormGroup>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button disabled={this.state.submitDisabled} onClick={this.handleVendorSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(AddVendorDialog);

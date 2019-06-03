import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
import SimpleSnackbar from './SimpleSnackbar'

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
  headers: {
    'X-CSRF-Token': csrfToken,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export class AddVendorDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleVendorSubmit = this.handleVendorSubmit.bind(this);

    this.state = {
      open: false,
      submitDisabled: true,
      existingVendors: [],
      vendorName: '',
      vendorWebsite: '',
      vendorStreetAddress: '',
      vendorCityStateZip: '',
      pointPersonName: '',
      pointPersonPhone: '',
      pointPersonEmail: '',
      message: null
    };
  }

  componentWillMount(){
    thisAxios.get('/existing_vendors')
    .then((response) => {
      console.log(response.data)
      this.setState({existingVendors: response.data})
    })
    .catch((error) => console.error('axios error', error))
  }

  componentWillReceiveProps(props) {
    const vendor = props.vendor;

    if (vendor != null) {
      const pointPerson = (vendor.point_people_array || [])[0] || {};

      this.setState({
        vendorId: vendor.id,
        vendorName: vendor.name,
        vendorWebsite: vendor.website,
        vendorStreetAddress: vendor.street,
        vendorCityStateZip: vendor.city_state_and_zip,
        pointPersonId: pointPerson.id,
        pointPersonName: pointPerson.name,
        pointPersonPhone: pointPerson.phone,
        pointPersonEmail: pointPerson.email
      })
    }
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
    this.setState({ pointPersonName: '' });
    this.setState({ pointPersonPhone: '' });
    this.setState({ pointPersonEmail: '' });
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

  clearMessage = () => {
    this.setState({ message: null });
  };

  handleVendorSubmit() {
    const {vendorId, vendorName, vendorWebsite, vendorStreetAddress, vendorCityStateZip, pointPersonId, pointPersonName, pointPersonPhone, pointPersonEmail} = this.state;
    const that = this;

    let request = thisAxios.post;
    let url = '/vendors';

    if (vendorId != null) {
      request = thisAxios.patch;
      url = `/vendors/${vendorId}`;
    }

    request(url, {
      vendor: {
        name: vendorName,
        website: vendorWebsite,
        street: vendorStreetAddress,
        city_state_and_zip: vendorCityStateZip,
      }
    })
    .then((response) => {
      console.log(response);

      let request = thisAxios.post;
      let url = '/point_people';

      if (vendorId != null) {
        request = thisAxios.patch;
        url = `/point_people/${pointPersonId}`;
      }

      return request(url, {
        point_person: {
          name: pointPersonName,
          email: pointPersonPhone,
          phone: pointPersonEmail,
          vendor_id: response.data.id
        }
      });
    })
    .then((response) => {
      console.log(response);
      that.handleClose()
      that.resetForm()

      const { onSubmit } = this.props;
      if (onSubmit) {
        onSubmit();
      }

      const link = `/vendors/${response.data.vendor_id}`;
      that.setState({
        message: [
          'Vendor was sucessfully created. ',
          <a href={link}>View</a>
        ]
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  submitButtonEnabledYet() {
    const {vendorName, vendorWebsite, vendorStreetAddress,  vendorCityStateZip, pointPersonName, pointPersonPhone, pointPersonEmail} = this.state;

    const inputs = [
      vendorName,
      vendorWebsite,
      vendorStreetAddress,
      vendorCityStateZip
    ]

    if (inputs.map(input => input && input.length > 0).includes(false)) {
      this.setState({ submitDisabled: true })
    } else {
      this.setState({ submitDisabled: false })
    }
  }

  renderExistingVendorsWarning() {
    var searchTerm = this.state.vendorName;
    var vendors = this.state.existingVendors;
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
    const buttonText = this.props.buttonText || 'Add Vendor'
    const dialogTitle = this.props.dialogTitle || 'Add a vendor'
    const { message } = this.state;

    return (
      <div>
        <Button className={classes.button} onClick={this.handleClickOpen}>{buttonText}</Button>
        <SimpleSnackbar
          open={ message != null }
          closeSnackbar={ this.clearMessage.bind(this) }
          message={ message } />
        <Dialog
          className={classes.root}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" className={classes.title}>{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>
            </DialogContentText>

            <FormGroup>

              {this.renderExistingVendorsWarning()}

              <FormControl id="vendor-name" className={classes.review}>
                <TextField
                  id="multiline-flexible"
                  label="Vendor Name"
                  multiline
                  rowsMax="10"
                  value={this.state.vendorName}
                  onChange={this.handleVendorNameChange}
                />
              </FormControl>

              <FormControl id="vendor-website" className={classes.review}>
                <TextField
                  id="multiline-flexible"
                  label="Vendor Website"
                  multiline
                  rowsMax="10"
                  value={this.state.vendorWebsite}
                  onChange={this.handleVendorWebsiteChange}
                />
              </FormControl>

              <FormControl id="vendor-street-address" className={classes.review}>
                <TextField
                  label="Street Address (Include Suite # if applicable)"
                  value={this.state.vendorStreetAddress}
                  onChange={this.handleVendorStreetAddressChange}
                />
              </FormControl>

              <FormControl id="vendor-city-state-zip"className={classes.review}>
                <TextField
                  label="City, State Zip Code"
                  value={this.state.vendorCityStateZip}
                  onChange={this.handleVendorCityStateZipChange}
                />
              </FormControl>

              <FormControl id="point-person-name" className={classes.review}>
                <TextField
                  label="Point Person Name"
                  value={this.state.pointPersonName}
                  onChange={this.handlePointPersonNameChange}
                />
              </FormControl>

              <FormControl id="point-person-phone" className={classes.review}>
                <TextField
                  label="Point Person Phone"
                  value={this.state.pointPersonPhone}
                  onChange={this.handlePointPersonPhoneChange}
                />
              </FormControl>

              <FormControl id="point-person-email" className={classes.review}>
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
            <Button id="submit" disabled={this.state.submitDisabled} onClick={this.handleVendorSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(AddVendorDialog);

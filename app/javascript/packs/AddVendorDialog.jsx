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
  stars: {
    marginLeft: 50,
    marginTop: 12
  },
  switchAnon: {
    marginTop: 10
  }
});

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
const thisAxios = axios.create({
  baseURL: 'https://marvl-next.herokuapp.com',
  headers: {
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
      vendorName: "",
      vendorWebsite: "www.",
      vendorStreetAddress: '',
      vendorCityStateZip: '',
      categoryId: null,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  resetForm = () => {
    this.setState({ vendorId: null });
    this.setState({ reviewPublicContent: '' });
    this.setState({ reviewPrivateContent: '' });
    this.setState({ rating: 0 });
  }

  handleCategoryChange = (id) => {
    this.setState({ categoryId: id })
  }

  handleVendorNameChange = event => {
    this.setState({ vendorName: event.target.value });
  };

  handleVendorWebsiteChange = event => {
    this.setState({ vendorWebsite: event.target.value });
  };

  handleVendorStreetAddressChange = event => {
    this.setState({ vendorStreetAddress: event.target.value });
  };

  handleVendorCityStateZipChange = event => {
    this.setState({ vendorStreetAddress: event.target.value });
  };

  handleRatingChange = (newRating) => {
    this.setState({ rating: newRating });
  };

  handleVendorSubmit() {
    const vendorName = this.state.vendorName
    const vendorWebsite = this.state.vendorWebsite
    const reviewPublicContent = this.state.reviewPublicContent
    const reviewPrivateContent = this.state.reviewPrivateContent
    const rating = this.state.rating
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


    thisAxios.post(`/reviews`, {
      review: {
        user_id: userId,
        vendor_id: vendorId,
        review_content: reviewPublicContent,
        review_private_content: reviewPrivateContent,
        rating: rating
      }
    })
    .then(function (response) {
      console.log(response);
      that.handleClose()
      that.resetForm()
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  renderExistingVendorsWarning() {
    var searchTerm = this.state.vendorName;
    var vendors = this.props.existingVendors;
    var i;
    if (searchTerm.length > 4) {
      for (i = 0; i < vendors.length; i++) {
        if (vendorName.toUpperCase().indexOf( searchTerm.toUpperCase() ) > -1 ) {
          return (
            <div>
              <Typography variant='subheading' align='center'>Here are some existing vendors that match yours.</Typography>
              {vendors
                .filter((vendor) => `${vendor.name}`.toUpperCase().indexOf(this.props.vendorName.toUpperCase()) >= 0)
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

              <FormControl className={classes.formControl}>
                <IntegrationReactSelect vendorForm={true} handleCategoryChange={this.handleCategoryChange} />
              </FormControl>

            </FormGroup>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleReviewSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(AddVendorDialog);

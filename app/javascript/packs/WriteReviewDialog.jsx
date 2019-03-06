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
    color: 'white'
  },
  formControl: {
    marginBottom: 10
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
  headers: {
    'X-CSRF-Token': csrfToken,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

class WriteReviewDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleReviewSubmit = this.handleReviewSubmit.bind(this);

    this.state = {
      open: false,
      vendorId: null,
      categoryId: null,
      reviewPublicContent: '',
      reviewPrivateContent: '',
      rating: 0,
      submitDisabled: true
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
    this.setState({ categoryId: null });
    this.setState({ reviewPublicContent: '' });
    this.setState({ reviewPrivateContent: '' });
    this.setState({ rating: 0 });
  }

  handleVendorChange = (id) => {
    this.setState({ vendorId: id }, () => this.submitButtonEnabledYet() )
  }

  handlePublicContentChange = event => {
    this.setState({ reviewPublicContent: event.target.value }, () => this.submitButtonEnabledYet() );
  };

  handlePrivateContentChange = event => {
    this.setState({ reviewPrivateContent: event.target.value } );
  };

  handleRatingChange = (newRating) => {
    this.setState({ rating: newRating }, () => this.submitButtonEnabledYet() );
  };

  handleCategoryChange = (id) => {
    this.setState( { categoryId: id }, () => this.submitButtonEnabledYet() );
  }

  handleReviewSubmit() {
    const userId = document.getElementById("userid").getAttribute('value')
    const vendorId = this.state.vendorId
    const categoryId = this.state.categoryId
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
        category_id: categoryId,
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

  submitButtonEnabledYet() {
    const {reviewPublicContent, reviewPrivateContent, rating, vendorId} = this.state;

    const inputs = [
      reviewPublicContent
    ]


    if (inputs.map(input => input.length > 0).includes(false) || vendorId === null) {
      this.setState({ submitDisabled: true })
    } else {
      this.setState({ submitDisabled: false })
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button id="write-review-button" className={classes.button} onClick={this.handleClickOpen}>Write Review</Button>
        <Dialog
          className={classes.root}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" className={classes.title}>Write a review</DialogTitle>
          <DialogContent>
            <DialogContentText>
            </DialogContentText>

            <FormGroup>
              <FormControl id="choose-vendor" className={classes.formControl}>
                <IntegrationReactSelect reviewForm={true} handleVendorChange={this.handleVendorChange} />
              </FormControl>

              <FormControl id="choose-category" className={classes.formControl}>
                <IntegrationReactSelect categorySelect={true} handleCategoryChange={this.handleCategoryChange} />
              </FormControl>

              <FormControl id="public-review" className={classes.review}>
                <TextField
                  id="multiline-flexible"
                  label="Write your review"
                  multiline
                  rowsMax="10"
                  value={this.state.reviewPublicContent}
                  onChange={this.handlePublicContentChange}
                />
              </FormControl>

              <FormControl id="private-review" className={classes.review}>
                <TextField
                  id="multiline-flexible"
                  label="Write a private section of your review (visible to CPA staff only)"
                  multiline
                  rowsMax="10"
                  value={this.state.reviewPrivateContent}
                  onChange={this.handlePrivateContentChange}
                />
              </FormControl>

              <FormControl id="rating-stars" >
                <InputLabel>Rating</InputLabel>
                <ReactStars
                  className={classes.stars}
                  count={5}
                  value={this.state.rating}
                  onChange={this.handleRatingChange}
                  size={24}
                  color2={'#ffd700'} />
              </FormControl>

            </FormGroup>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button id="submit-review" disabled={this.state.submitDisabled} onClick={this.handleReviewSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(WriteReviewDialog);

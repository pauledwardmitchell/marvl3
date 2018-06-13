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
  review: {
    marginBottom: 10
  },
  stars: {
    marginLeft: 130,
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
    'Content-Type': 'application/json'
  }
});

class WriteReviewDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleReviewSubmit = this.handleReviewSubmit.bind(this);

    this.state = {
      open: false,
      reviewContent: '',
      ratingService: 0,
      ratingQuality: 0,
      anonymous: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleContentChange = event => {
    this.setState({ reviewContent: event.target.value });
  };

  handleRatingServiceChange = (newRating) => {
    this.setState({ ratingService: newRating });
  };

  handleRatingQualityChange = (newRating) => {
    this.setState({ ratingQuality: newRating });
  };

  handleAnonChange = event => {
    this.setState({ anonymous: !this.state.anonymous });
  };

  handleReviewSubmit() {
    const userId = 1
    const vendorId = 1
    const reviewContent = this.state.reviewContent
    const ratingService = this.state.ratingService
    const ratingQuality = this.state.ratingQuality
    const anonymous = this.state.anonymous
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
        review_content: reviewContent,
        rating_service: ratingService,
        rating_quality: ratingQuality,
        anonymous: anonymous
      }
    })
    .then(function (response) {
      console.log(response);
      that.handleClose()
    })
    .catch(function (error) {
      console.log(error);
    });
  }

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
        <Button variant="outlined" className={classes.button} onClick={this.handleClickOpen}>Write Review</Button>
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
              <FormControl className={classes.formControl}>
                <IntegrationReactSelect data={[ { value: 'Composting', label: 'Composting' }, { value: 'Computers - Staff', label: 'Computers - Staff' } ]}/>
              </FormControl>

              <FormControl className={classes.review}>
                <TextField
                  id="multiline-flexible"
                  label="Write your review"
                  multiline
                  rowsMax="10"
                  value={this.state.reviewContent}
                  onChange={this.handleContentChange}
                />
              </FormControl>

              <FormControl>
                <InputLabel>Customer Service</InputLabel>
                <ReactStars
                  className={classes.stars}
                  count={5}
                  value={this.state.ratingService}
                  onChange={this.handleRatingServiceChange}
                  size={24}
                  color2={'#ffd700'} />
              </FormControl>

              <FormControl>
                <InputLabel>Quality of Work</InputLabel>
                <ReactStars
                  className={classes.stars}
                  count={5}
                  value={this.state.ratingQuality}
                  onChange={this.handleRatingQualityChange}
                  size={24}
                  color2={'#ffd700'} />
              </FormControl>

              <FormControlLabel className={classes.switchAnon}
                control={
                  <Switch
                    checked={this.state.anonymous}
                    onChange={this.handleAnonChange}
                    value="anonymous"
                    color="primary"
                  />
                }
                label={this.anonLabel()}
              />

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

export default withStyles(styles)(WriteReviewDialog);

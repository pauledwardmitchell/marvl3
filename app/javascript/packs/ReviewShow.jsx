import React from 'react'

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import ButtonAppBar from './ButtonAppBar'
import ReviewShowDetailsBox from './ReviewShowDetailsBox'
import OrgShowLogo from './OrgShowLogo'
import EditReviewDialog from './EditReviewDialog'

import ReactStars from 'react-stars'
import axios from 'axios'

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
const thisAxios = axios.create({
  headers: {
    'X-CSRF-Token': csrfToken
  }
});

const loadingReviewData =
  {user_name: "Loading...",
   user_id: 0,
   org_name: "Loading...",
   org_id: null,
   vendor_name: "Loading...",
   vendor_id: null,
   rating: 5,
   public_review: "Loading...",
   private_review: "Loading...",
   private_review_permission: false,
   logo_link: "https://static1.squarespace.com/static/58f3a21f59cc68f36175d419/t/58f3a38bebbd1a9ee47f1778/1536187527091/?format=300w"
  }


const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: theme.mixins.gutters({
    padding: 16,
    margin: theme.spacing.unit * 3,
  })
});

class ReviewShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewData: loadingReviewData
    };
  }

  componentDidMount(){
    const reviewId = document.getElementById("review").getAttribute('value');

    thisAxios.get('/review_show_data?review=' + reviewId)
      .then((response) => {
        this.setState({reviewData: response.data})
      })
    .catch((error) => console.error('axios error', error))
  }

  renderEditDialogButton(reviewData) {
    const pageUserId = reviewData.user_id.toString();
    const sessionUserId = document.getElementById("userid").getAttribute('value');
    const reviewId = document.getElementById("review").getAttribute('value');
    const review = {
      id: reviewId,
      review: reviewData.public_review,
      private_review: reviewData.private_review,
      rating: reviewData.rating
    }

    if ( pageUserId === sessionUserId ) {
      return ( <EditReviewDialog review={review}/> )
    } else {
      return ( <span></span> )
    }
  }

  renderPrivateReview (reviewData) {
    if ( reviewData.private_review_permission === true && reviewData.private_review != null ) {
      return (<Typography component="h3" variant='subheading' gutterBottom>
                Private Review: {reviewData.private_review}
              </Typography>)
    } else if (reviewData.private_review_permission === true) {
      return (<Typography component="h3" variant='subheading' gutterBottom>
                Private Review: (None given)
              </Typography>)
    } else {
      return <span></span>
    }
  }

  render () {
    const { classes } = this.props;
    const { reviewData } = this.state;

    return (
      <div>
        <ButtonAppBar />
        <Grid container direction='row' justify='flex-start' spacing={16}>
          <Grid item xs={3}>
            <OrgShowLogo logo_link={reviewData.logo_link}/>
          </Grid>
          <Grid item xs={6}>
            <ReviewShowDetailsBox data={reviewData} />
          </Grid>
        </Grid>
        <Grid container direction='row' justify='flex-start' spacing={16}>
          <Grid item xs={10}>
            <Paper className={classes.paper} elevation={4}>
              <ReactStars
                className={classes.stars}
                edit={false}
                count={5}
                value={reviewData.rating}
                size={24}
                color2={'#ffd700'} />
              <Typography component="h3" variant='subheading' gutterBottom>Review: {reviewData.public_review}</Typography>
              {this.renderPrivateReview(reviewData)}
              <Typography gutterBottom><a href={'/users/'+reviewData.user_id}>{reviewData.user_name}</a> wrote this {reviewData.days_ago} days ago</Typography>
              {this.renderEditDialogButton(reviewData)}
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(ReviewShow);

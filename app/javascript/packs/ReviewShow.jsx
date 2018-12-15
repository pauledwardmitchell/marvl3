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
  baseURL: 'https://marvl-next.herokuapp.com',
  headers: {
    'X-CSRF-Token': csrfToken
  }
});

const loadingReviewData =
  {user_name: "Loading...",
   user_id: null,
   org_name: "Loading...",
   org_id: null,
   vendor_name: "Loading...",
   vendor_id: null,
   rating: 5,
   public_review: "Loading...",
   private_review: "Loading...",
   logo_link: "https://static1.squarespace.com/static/58f3a21f59cc68f36175d419/t/58f3a38bebbd1a9ee47f1778/1536187527091/?format=300w"
  }


const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class ReviewShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewData: loadingReviewData
    };
  }

  componentWillMount(){
    const reviewId = document.getElementById("review").getAttribute('value');

    thisAxios.get('/review_show_data?review=' + reviewId)
      .then((response) => {
        this.setState({reviewData: response.data})
      })
    .catch((error) => console.error('axios error', error))
  }

  renderEditDialogButton(review) {
    const pageUserId = this.state.user_id;
    const sessionUserId = document.getElementById("userid").getAttribute('value');

    if ( pageUserId === sessionUserId ) {
      return ( <EditReviewDialog review={review}/> )
    } else {
      return ( <span></span> )
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
          <Grid item xs={5}>
            <ReviewShowDetailsBox data={reviewData} />
          </Grid>
        </Grid>
        <Grid container direction='row' justify='flex-start' spacing={16}>
          <Grid item xs={10}>
            <Paper className={classes.paper} elevation={4}>
              <Typography component="h3" variant='subheading' gutterBottom>Review: {reviewData.review}</Typography>
              <Typography component="h3" variant='subheading'>Private Review: {reviewData.private_review}</Typography>
              <ReactStars
                className={classes.stars}
                edit={false}
                count={5}
                value={review.rating}
                size={24}
                color2={'#ffd700'} />
              <Typography gutterBottom>{review.user_name} wrote this {review.days_ago} days ago</Typography>
              {this.renderEditDialogButton(review)}
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(ReviewShow);
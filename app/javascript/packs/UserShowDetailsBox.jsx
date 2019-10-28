import axios from 'axios'
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
const thisAxios = axios.create({
  headers: {
    'X-CSRF-Token': csrfToken,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

const styles = theme => ({
  root: theme.mixins.gutters({
    padding: 16,
    paddingBottom: 16,
    margin: theme.spacing.unit * 3,
  }),
});


class UserShowDetailsBox extends React.Component {
  userId = () => {
    return document.getElementById("theuser").getAttribute('value');
  };

  isCurrentUser = () => {
    const currentUserId = document.getElementById("userid").getAttribute('value');
    return currentUserId === this.userId();
  };


  updateWeeklyDigest = (value) => {
    this.setState({ digest: value });

    thisAxios.patch(`/users/${this.userId()}`, {
      user: {
        receives_weekly_digest: value
      }
    })
    .catch((err) => {
      console.log(err);
      this.setState({ digest: !value });
    });
  };

  constructor(props) {
    super(props);

    this.state = {
      digest: null
    }
  }

  inactiveUserName(status) {
    if (status == true) {
      return ( " (Inactive Account)")
    } else {
      return ("")
    }
  }

  inactiveSchoolMessage(status) {
    if (status == true) {
      return ( "Formerly at ")
    } else {
      return ("")
    }
  }

  inactiveUserGeneralMessage(status) {
    if (status == true) {
      return (<Typography variant="subheading" component="h3">This user currently works at a different organization.</Typography>)
    } else {
      return (<div></div>)
    }
  }

  render() {
    const { classes, data } = this.props;
    const { digest } = this.state;

    const digestChecked = digest == null ? data.receives_weekly_digest : digest;
    const digestCheckbox = (
      <FormControlLabel
        control={
          <Checkbox
            checked={digestChecked}
            onChange={(event, checked) => this.updateWeeklyDigest(checked)}
            color="primary"
          />
        }
        label="Receive weekly digest email"
      />
    );

    return (
      <div>
        <Paper className={classes.root} elevation={4}>
          <Typography variant="headline" component="h3">{data.name}{this.inactiveUserName(data.active)}</Typography>
          <Typography variant="subheading" component="h3">{data.email}</Typography>
          <Typography variant="subheading" component="h3">{data.title}</Typography>
          <Typography variant="subheading" component="h3">{this.inactiveSchoolMessage(data.active)}{data.school_name}</Typography>
          {this.inactiveUserGeneralMessage(data.active)}
          { this.isCurrentUser() && data.receives_weekly_digest != null ? digestCheckbox : null }
        </Paper>
      </div>
    );
  }
}

UserShowDetailsBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserShowDetailsBox);

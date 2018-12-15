import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  root: theme.mixins.gutters({
    padding: 16,
    paddingBottom: 16,
    margin: theme.spacing.unit * 3,
  }),
  link: {
    textDecoration: 'inherit',
    color: 'inherit'
  }
});

function ReviewShowDetailsBox(props) {
  const { classes, data } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">
          <a href={'/users/'+data.user_id} className={classes.link}>{data.user_name}</a> (<a href={'/organizations/'+data.organization_id} className={classes.link}>{data.org_name}</a>)
        </Typography>
        <Typography variant="headline" component="h3">
          <a href={'/vendors/'+data.vendor_id} className={classes.link}>{data.vendor_name}</a>
        </Typography>
        <Typography variant="subheading" component="h3">
          CATEGORY:
        </Typography>
      </Paper>
    </div>
  );
}

ReviewShowDetailsBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReviewShowDetailsBox);

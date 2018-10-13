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
});

function VendorShowDetailsBox(props) {
  const { classes, data } = props;
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">{data.name}</Typography>
        <Typography variant="subheading" component="h3">{data.street}</Typography>
        <Typography variant="subheading" component="h3">{data.city_state_and_zip}</Typography>
        <Typography variant="subheading" component="h3">{data.website}</Typography>
      </Paper>
      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">Who to Call:</Typography>
        {data.point_people_array.map((person) => {
          return  <div key={person.id}>
                    <Typography variant="subheading" component="h3">{person.name_and_title}</Typography>
                    <Typography variant="body2">{person.email}</Typography>
                    <Typography variant="body2" gutterBottom>{person.phone}</Typography>
                  </div>
          }
        )}

      </Paper>
    </div>
  );
}

VendorShowDetailsBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VendorShowDetailsBox);

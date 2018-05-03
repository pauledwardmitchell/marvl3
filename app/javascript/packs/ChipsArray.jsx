import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';


const styles = theme => ({
  root: theme.mixins.gutters({
    padding: 16,
    paddingBottom: 16,
    margin: theme.spacing.unit * 3,
  }),
});

class ChipsArray extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div>
      <Paper className={classes.root}>
        <Typography variant='subheading'>
          Facilities tags
        </Typography>
        <Chip label="High Rise" className={classes.chip} />
        <Chip label="Steam Heat" className={classes.chip} />
        <Chip label="Rented Space" className={classes.chip} />
      </Paper>
      <Paper className={classes.root}>
        <Typography variant='subheading'>
          Acedemic tags
        </Typography>
        <Chip label="SpEd Services" className={classes.chip} />
        <Chip label="Graduate Support" className={classes.chip} />
        <Chip label="Literacy" className={classes.chip} />
        <Chip label="High School" className={classes.chip} />
      </Paper>
      </div>
    );
  }
}

ChipsArray.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChipsArray);

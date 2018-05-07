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

class VendorShowCategoriesTags extends React.Component {

  handleClick() {

  }

  render() {
    const { classes } = this.props;

    return (
      <div>
      <Paper className={classes.root}>
        <Typography variant='subheading'>
          Does work in:
        </Typography>
        <Chip label="HVAC" onClick={this.handleClick} className={classes.chip} />
        <Chip label="Boiler" onClick={this.handleClick} className={classes.chip} />
        <Chip label="Furnace" onClick={this.handleClick} className={classes.chip} />
      </Paper>
      <Paper className={classes.root}>
        <Typography variant='subheading' align='center'>
          Contracted with
        </Typography>
        <Typography variant='display3' align='center'>
          12
        </Typography>
        <Typography variant='subheading' align='center'>
          of us
        </Typography>
      </Paper>
      </div>
    );
  }
}

VendorShowCategoriesTags.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VendorShowCategoriesTags);

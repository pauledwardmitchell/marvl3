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

  handleClick() {

  }

  render() {
    const { classes } = this.props;

    return (
      <div>
      <Paper className={classes.root}>
        <Typography variant='subheading'>
          Facilities tags
        </Typography>
        <Chip label="High Rise" onClick={this.handleClick} className={classes.chip} />
        <Chip label="Steam Heat" onClick={this.handleClick} className={classes.chip} />
        <Chip label="Rented Space" onClick={this.handleClick} className={classes.chip} />
      </Paper>
      <Paper className={classes.root}>
        <Typography variant='subheading'>
          Academic tags
        </Typography>
        <Chip label="SpEd Services" onClick={this.handleClick} className={classes.chip} />
        <Chip label="Graduate Support" onClick={this.handleClick} className={classes.chip} />
        <Chip label="Literacy" onClick={this.handleClick} className={classes.chip} />
        <Chip label="High School" onClick={this.handleClick} className={classes.chip} />
      </Paper>
      </div>
    );
  }
}

ChipsArray.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChipsArray);

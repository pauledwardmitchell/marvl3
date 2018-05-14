import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Tooltip from 'material-ui/Tooltip';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import RfpTextField from './RfpTextField'


const styles = theme => ({
  root: theme.mixins.gutters({
    padding: 16,
    paddingBottom: 16,
    margin: theme.spacing.unit * 3,
  }),
  chip: {
    margin: theme.spacing.unit,
  }
});

const theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      popper: {
        width: 200
      },
    },
  },
});

class CategoryShowBatchRfp extends React.Component {

  handleClick() {

  }

  handleDelete() {
    console.log("Delete chip!")
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper className={classes.root}>
          <Typography variant='subheading'>
            Send RFP to:
          </Typography>
          <Chip label="Amazing HVAC" onDelete={this.handleDelete} className={classes.chip} />
          <Chip label="Brilliant HVAC" onDelete={this.handleDelete} className={classes.chip} />
          <Chip label="Meh HVAC" onDelete={this.handleDelete} className={classes.chip} />
          <Chip label="Never Again HVAC" onDelete={this.handleDelete} className={classes.chip} />
          <RfpTextField />
        </Paper>
      </div>
    );
  }
}

CategoryShowBatchRfp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoryShowBatchRfp);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';



const styles = theme => ({
  root: theme.mixins.gutters({
    padding: 16,
    paddingBottom: 16,
    margin: theme.spacing.unit * 3,
  })
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
      <MuiThemeProvider theme={theme}>
      <Tooltip
        title="Three Rivers PCS, Noble Street PCS, Jones Prep PCS, Peyton PCS, Twain PCS, Crane PCS, Irving PCS, Washington PCS"
        placement='bottom'
        >
      <Paper className={classes.root}>
        <Typography variant='subheading' align='center'>
          Contracted with
        </Typography>
        <Typography variant='display3' align='center'>
          8
        </Typography>
        <Typography variant='subheading' align='center'>
          of us
        </Typography>
      </Paper>
      </Tooltip>
      </MuiThemeProvider>
      </div>
    );
  }
}

VendorShowCategoriesTags.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VendorShowCategoriesTags);

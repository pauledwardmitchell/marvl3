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

  state = {
    vendors: ['Amazing HVAC', 'Brilliant HVAC', 'Meh HVAC', 'Never Again HVAC']
  };

  handleClick() {

  }

  handleeDelete(vendor) {
    console.log("Delete chip!")
    var index = this.state.vendors.indexOf(vendor);
    var newVendorsArray = this.state.vendors
    if (index > -1) {
      newVendorsArray.splice(index, 1);
    }
    this.setState({
      vendors: newVendorsArray
    })
  }

  handleDelete = vendor => () => {
    const vendors = [...this.state.vendors];
    const chipToDelete = vendors.indexOf(vendor);
    vendors.splice(chipToDelete, 1);
    this.setState({ vendors });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper className={classes.root}>
          <Typography variant='subheading'>
            Send RFP to:
          </Typography>

          {this.state.vendors.map(vendor => {
            return (
              <Chip key={vendor} label={vendor} onDelete={this.handleDelete(vendor)} className={classes.chip} />
            );
          })}
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

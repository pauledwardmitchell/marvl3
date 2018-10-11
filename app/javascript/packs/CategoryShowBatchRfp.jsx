import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleDelete = vendor => () => {
    const vendors = [...this.state.vendors];
    const chipToDelete = vendors.indexOf(vendor);
    vendors.splice(chipToDelete, 1);
    this.setState({ vendors });
  };

  render() {
    const { classes, data } = this.props;

    return (
      <div>
        <Paper className={classes.root}>
          <Typography variant='subheading'>
            Send RFP to:
          </Typography>

          {data.vendors.map(vendor => {
            return (
              <Chip key={vendor.id} label={vendor.name} onDelete={this.handleDelete(vendor)} className={classes.chip} />
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

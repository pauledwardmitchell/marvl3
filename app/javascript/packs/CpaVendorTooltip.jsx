import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';

import FaceIcon from '@material-ui/icons/Face';
import StarIcon from '@material-ui/icons/Star';

const styles = theme => ({
  root: ({
    width: 500,
    marginBottom: 50
  }),
  chip: ({
    margin: theme.spacing.unit,
  }),
});

function CpaVendorTooltip(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Tooltip title="Hire this vendor through CPA to receive a CPA negotiated rate and protection by our terms and conditions.  Contact amy@cpa.coop today!"
               placement="right">
        <Chip
          icon={<FaceIcon />}
          label="CPA Preferred Vendor"
          className={classes.chip}
          color="primary"
        />
      </Tooltip>
    </div>
  );
}

CpaVendorTooltip.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CpaVendorTooltip);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const styles = theme => ({
  fab: {
    marginLeft: 10,
    marginRight: 10
  },
});

function CategoryShowPreferredVendorBadge(props) {
  const { classes } = props;

  return (
    <span className="preferred">
      <Tooltip title="CPA Preferred Vendor">
        <StarBorderIcon className={classes.fab}/>
      </Tooltip>
    </span>
  );
}

CategoryShowPreferredVendorBadge.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoryShowPreferredVendorBadge);

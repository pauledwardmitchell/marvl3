import { withStyles } from '@material-ui/core/styles';

import { AddVendorDialog } from './AddVendorDialog'

const styles = theme => ({
  root: {
    visibility: 'visible'
  },
  title: {
    width: 600
  },
  button: {
    color: 'inherit',
    marginLeft: 20
  },
  review: {
    marginBottom: 10
  },
  stars: {
    marginLeft: 50,
    marginTop: 12
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    marginBottom: 10
  },
});

export default withStyles(styles)(AddVendorDialog);

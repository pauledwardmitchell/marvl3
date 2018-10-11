import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});


class RfpTextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rfpDetails: '',
    };
  }

  handleRfpDetailsChange = event => {
    this.setState({ rfpDetails: event.target.value })
  }

  handleRfpSubmit() {

  }

  render() {
    const { classes } = this.props;

    return (
      <FormGroup className={classes.container}>
        <FormControl className={classes.formControl}>
          <TextField
            id="rfp-details"
            label="Describe the work."
            multiline
            rowsMax="20"
            value={this.state.rfpDetails}
            onChange={this.handleRfpDetailsChange}
            className={classes.textField}
            margin="normal"
          />
        </FormControl>
        <Button color="inherit" onClick={this.handleRfpSubmit}>Send Batch RFP</Button>
      </FormGroup>
    );
  }
}

RfpTextField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RfpTextField);

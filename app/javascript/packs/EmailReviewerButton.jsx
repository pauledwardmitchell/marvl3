import React from 'react';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';


class EmailReviewerButton extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button id="mailto_button" variant="outlined" color="primary" href={`mailto:?to=${this.props.data.user_email}&body=Hi there! I would love to be in touch about the following MARVL review you wrote about ${this.props.data.vendor_name}: ${this.props.data.public_review}.`}>
          Email {this.props.data.user_name} about this review
        </Button>
      </div>
    );
  }
}

export default (EmailReviewerButton);

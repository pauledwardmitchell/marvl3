import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import CssBaseline from 'material-ui/CssBaseline';

import VendorShow from './VendorShow'


ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
      <VendorShow />
  </React.Fragment>,
  document.getElementById('vendors')
);

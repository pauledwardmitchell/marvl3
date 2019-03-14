import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import CssBaseline from '@material-ui/core/CssBaseline';

import TermsAndConditions from './TermsAndConditions'


ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
      <TermsAndConditions />
  </React.Fragment>,
  document.getElementById('terms')
);

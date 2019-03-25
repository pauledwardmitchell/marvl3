import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import CssBaseline from '@material-ui/core/CssBaseline';

import ForgotPasswordPage from './ForgotPasswordPage'

ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
    <ForgotPasswordPage />
  </React.Fragment>,
  document.getElementById('forgot-password')
);

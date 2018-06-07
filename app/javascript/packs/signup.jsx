import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import CssBaseline from '@material-ui/core/CssBaseline';

import SignupPage from './SignupPage'


ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
      <SignupPage />
  </React.Fragment>,
  document.getElementById('signup')
);

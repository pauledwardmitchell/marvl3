import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import CssBaseline from '@material-ui/core/CssBaseline';

import LoginPage from './LoginPage'


ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
      <LoginPage />
  </React.Fragment>,
  document.getElementById('login')
);

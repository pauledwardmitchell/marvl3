import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import CssBaseline from '@material-ui/core/CssBaseline';

import LoginModal from './LoginModal'


ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
      <LoginModal />
  </React.Fragment>,
  document.getElementById('login')
);

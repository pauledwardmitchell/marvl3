import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import CssBaseline from 'material-ui/CssBaseline';

import UserProfile from './UserProfile'


ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
      <UserProfile />
  </React.Fragment>,
  document.getElementById('user-profile')
);

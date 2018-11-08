import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import CssBaseline from '@material-ui/core/CssBaseline';

import UserShow from './UserShow'


ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
      <UserShow />
  </React.Fragment>,
  document.getElementById('user')
);

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import CssBaseline from 'material-ui/CssBaseline';

import Landing from './Landing'


ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
      <Landing />
  </React.Fragment>,
  document.getElementById('main')
);

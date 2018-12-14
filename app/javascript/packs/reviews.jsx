import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import CssBaseline from '@material-ui/core/CssBaseline';

import ReviewShow from './ReviewShow'


ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
      <ReviewShow />
  </React.Fragment>,
  document.getElementById('reviews')
);

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import CssBaseline from 'material-ui/CssBaseline';

import CategoryShow from './CategoryShow'


ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
      <CategoryShow />
  </React.Fragment>,
  document.getElementById('categories')
);

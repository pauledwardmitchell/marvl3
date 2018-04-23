import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import CssBaseline from 'material-ui/CssBaseline';

import OrganizationShow from './OrganizationShow'


ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
      <OrganizationShow />
  </React.Fragment>,
  document.getElementById('organization')
);

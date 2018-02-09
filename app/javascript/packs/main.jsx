import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import Reboot from 'material-ui/Reboot';

import Landing from './Landing'


ReactDOM.render(
  <div className='material'>
    <Reboot />
      <Landing />
  </div>,
  document.getElementById('main')
);

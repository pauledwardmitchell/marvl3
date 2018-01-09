import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blueGrey900} from 'material-ui/styles/colors';

import Landing from './Landing'

const muiTheme = getMuiTheme({
  palette: {
  },
  appBar: {
  },
});


ReactDOM.render(
  <div className='material'>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Landing />
    </MuiThemeProvider>
  </div>,
  document.getElementById('main')
);

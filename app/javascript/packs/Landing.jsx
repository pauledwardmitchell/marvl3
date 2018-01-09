import React from 'react'

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import DrawerUndockedExample from './DrawerUndockedExample'
import LandingSearch from './LandingSearch'

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postsData: []
    };
  }

  render () {
    return (
      <div>
        <AppBar
          title='Marvl'
          iconElementLeft={<DrawerUndockedExample />} />
        <LandingSearch />
      </div>
    )
  }
}

import React from 'react'

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import DrawerUndockedExample from './DrawerUndockedExample'
import LandingSearch from './LandingSearch'
import CategoriesGridList from './CategoriesGridList'

import axios from 'axios'

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesData: [],
      vendorsData: []
    };
  }

  componentDidMount() {
    axios.get(`https://www.marvl.org/data`)
      .then((response) => {
        this.setState({categoriesData: response.data.categories,
                       vendorsData: response.data.vendors})
      })
      .catch((error) => console.error('axios error', error))
  }

  render () {
    return (
      <div>
        <AppBar
          title='Marvl'
          showMenuIconButton={false}
          iconElementRight={<DrawerUndockedExample categories={this.state.categoriesData}/>} />
        <LandingSearch categories={this.state.categoriesData} vendors={this.state.vendorsData} />
      </div>
    )
  }
}

import React from 'react'

import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';


import DrawerUndockedExample from './DrawerUndockedExample';
import CategoryShow from './CategoryShow';
import ButtonAppBar from './ButtonAppBar';
import LandingSearch from './LandingSearch'
import LandingCategoryBox from './LandingCategoryBox'
import LandingCategoryCard from './LandingCategoryCard'
import LandingSchoolsGridList from './LandingSchoolsGridList'
import RecentActivityBox from './RecentActivityBox'
import LandingBestVendorsBox from './LandingBestVendorsBox'

import axios from 'axios'


export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.getDrawerStatus = this.getDrawerStatus.bind(this);
    this.state = {
      categoriesData: [],
      testData: [
        { label: 'Composting' },
        { label: 'Computers - Staff' },
        { label: 'Computers - Students' },
        { label: 'Custom Industrial Kitchens' },
        { label: 'Capital City Contracting' }
      ],
      searchTerm: "",
      drawerOpen: false,
      categoryShowOpen: false
    };
  }

  componentDidMount() {
    axios.get(`https://marvl-next.herokuapp.com/landing_search_data`)
      .then((response) => {
        this.setState({categoriesData: response.data.categories})
      })
      .catch((error) => console.error('axios error', error))
  }

  handleDrawerToggle() {
    this.setState({drawerOpen: !this.state.drawerOpen})
  }

  buttonTextCategories() {
    if (this.state.drawerOpen === false) {
      return "All Categories"
    } else {
      return "Hide Categories"
    }
  }

  getDrawerStatus() {
    return this.state.drawerOpen
  }

  categoryShow() {
    if (this.state.categoryShowOpen === true) {
      return (<CategoryShow />)
    } else {
      return (<div></div>)
    }
  }

  render () {
    return (
      <div style={{overflowX: 'hidden'}}>
        <ButtonAppBar />
        <LandingSearch categories={this.state.categoriesData} vendors={this.state.vendorsData} tests={this.state.testData}/>
        <LandingBestVendorsBox />
        <LandingSchoolsGridList />
        <RecentActivityBox />
      </div>
    )
  }
}

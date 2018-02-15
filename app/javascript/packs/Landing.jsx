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
      vendorsData: [],
      drawerOpen: false,
      categoryShowOpen: false
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

  leftButtons() {
    return (
      <a href="/writeareview">
        Button
          style={{margin: 4}}
          label="Write a Review" />
      </a>
    )
  }

  rightButtons() {
    return (
      <div>
        Button
          style={{margin: 4}}
          label={this.buttonTextCategories()}
          onClick={this.handleDrawerToggle} />
      </div>
    )
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
        <Grid container alignItems='center' direction= 'row' justify= 'center'>
          <Typography variant="headline" component="h1" style={{paddingTop: 40, paddingBottom: 20}}>
            MARVL
          </Typography>
        </Grid>
        <LandingSearch style={{}} categories={this.state.categoriesData} vendors={this.state.vendorsData} tests={this.state.testData}/>
        <Divider />
        <Grid container alignItems='center' direction= 'row' justify= 'center'>
          <Typography variant="headline" component="h2" style={{paddingTop: 40, paddingBottom: 20}}>
            Find the best vendors
          </Typography>
        </Grid>
        <Grid container alignItems='center' direction= 'row' justify= 'center'>
          <LandingCategoryCard type='bus'/>
          <LandingCategoryCard type='computers'/>
          <LandingCategoryCard type='security'/>
        </Grid>
        <Divider style={{marginTop: 150}}/>
        <Grid container alignItems='center' direction= 'row' justify= 'center'>
          <Typography variant="headline" component="h2" style={{paddingTop: 40, paddingBottom: 20}}>
            Browse vendors of network schools
          </Typography>
        </Grid>
        <LandingSchoolsGridList />
        <Divider style={{marginTop: 150}}/>
        <Grid container alignItems='center' direction= 'row' justify= 'center'>
          <Typography variant="headline" component="h2" style={{paddingTop: 40, paddingBottom: 20}}>
            Recent Activity
          </Typography>
        </Grid>
        <RecentActivityBox />
      </div>
    )
  }
}

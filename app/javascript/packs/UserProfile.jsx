import React from 'react'

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import axios from 'axios'


export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    // this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    // this.getDrawerStatus = this.getDrawerStatus.bind(this);
    // this.state = {
    //   categoriesData: [],
    //   testData: [
    //     { label: 'Composting' },
    //     { label: 'Computers - Staff' },
    //     { label: 'Computers - Students' },
    //     { label: 'Custom Industrial Kitchens' },
    //     { label: 'Capital City Contracting' }
    //   ],
    //   searchTerm: "",
    //   drawerOpen: false,
    //   categoryShowOpen: false
    // };
  }

  componentDidMount() {
    axios.get(`https://marvl-next.herokuapp.com/landing_search_data`)
      .then((response) => {
        this.setState({categoriesData: response.data.categories})
      })
      .catch((error) => console.error('axios error', error))
  }


  render () {
    return (
      <div>
        User Profile
      </div>
    )
  }
}

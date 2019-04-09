import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import CategoryShow from './CategoryShow';
import ButtonAppBar from './ButtonAppBar';
import LandingSearch from './LandingSearch';
import LandingCategoryCard from './LandingCategoryCard';
import LandingSchoolsGridList from './LandingSchoolsGridList';
import LandingPopularCategories from './LandingPopularCategories';
import LandingTaxonomy from './LandingTaxonomy';
import RecentActivityBox from './RecentActivityBox';
import SimpleMenu from './SimpleMenu';

import axios from 'axios';


export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <div style={{overflowX: 'hidden'}}>
        <ButtonAppBar />
        <LandingSearch/>
        <LandingSchoolsGridList />
        <LandingPopularCategories />
        <LandingTaxonomy />
        <RecentActivityBox />
      </div>
    )
  }
}

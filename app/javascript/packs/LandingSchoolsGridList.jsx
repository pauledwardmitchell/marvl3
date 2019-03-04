import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';

import axios from 'axios';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 800,
    height: 550,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  title: {
    paddingTop: 40,
    paddingBottom: 20
  }
});


const loadingSchoolsData = [
  {
    logo_link: "https://pbs.twimg.com/profile_images/1595191063/CCPCS-logo-icon-CMYK_WEB_400x400.gif",
    name: 'Capital City PCS',
    id: 8,
    points: 200
  },
  {
    logo_link: "https://pbs.twimg.com/profile_images/1786302154/Twitter_Logo03_400x400.png",
    name: 'DC PREP',
    id: 4,
    points: 100
  }
];

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
const thisAxios = axios.create({
  headers: {
    'X-CSRF-Token': csrfToken
  }
});


class LandingSchoolsGridList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schoolsData: loadingSchoolsData
    };
  }

  componentWillMount(){
    thisAxios.get('/landing_schools_data')
      .then((response) => {
        this.setState({schoolsData: response.data})
      })
    .catch((error) => console.error('axios error', error))
  }

  buildLink(id) {
    return '/organizations/' + id
  }

  render() {

    const { classes } = this.props;
    const { schoolsData } = this.state;

      return (
        <div>
          <Grid container
                alignItems='center'
                direction= 'row'
                justify= 'center'>
            <Grid container alignItems='center' direction= 'row' justify= 'center'>
              <Typography variant="headline" component="h2" className={classes.title}>
                Browse vendors of network schools
              </Typography>
            </Grid>
            <div className={classes.root}>
              <GridList cellHeight={200} className={classes.gridList} cols={4}>
                {schoolsData.map(school => (
                  <GridListTile key={school.id}>
                    <img src={school.logo_link} alt={school.name} />
                    <a href={this.buildLink(school.id)}>
                      <GridListTileBar
                        id={"grid-list-link-"+school.id}
                        title={school.name}
                        subtitle={school.points + " points"} />
                    </a>
                  </GridListTile>
                ))}
              </GridList>
            </div>
          </Grid>
          <Divider style={{marginTop: 150}}/>
        </div>
  );
    }
}

LandingSchoolsGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingSchoolsGridList);


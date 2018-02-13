import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid'
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import InfoIcon from 'material-ui-icons/Info';

import IconButton from 'material-ui/IconButton';
import StarBorderIcon from 'material-ui-icons/StarBorder';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});


const tileData = [
  {
    img: "https://pbs.twimg.com/profile_images/1595191063/CCPCS-logo-icon-CMYK_WEB_400x400.gif",
    title: 'Capital City PCS',
    id: 8
  },
  {
    img: "https://pbs.twimg.com/profile_images/1786302154/Twitter_Logo03_400x400.png",
    title: 'DC PREP',
    id: 4
  },
  {
    img: "https://pbs.twimg.com/profile_images/900102187933499392/vrbWtNB_.jpg",
    title: 'E.L. Haynes PCS',
    id: 1
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCVBYmU7Qq0GyDzY4p22IgFuvuwg-AnDi5ZP6SX6DAg7T9y5cI",
    title: 'Friendship PCS',
    id: 7
  },
  {
    img: "https://pbs.twimg.com/profile_images/2499611872/ov32xj1wrupsyzrdmbzt.png",
    title: 'IDEA PCS',
    id: 5
  },
  {
    img: "https://pbs.twimg.com/profile_images/762746251653816320/VjRsHYrC_400x400.jpg",
    title: 'KIPP DC',
    id: 2
  },
  {
    img: "https://pbs.twimg.com/profile_images/532975075054477312/uyY9cZTC_400x400.png",
    title: 'Paul PCS',
    id: 3
  },
  {
    img: "https://pbs.twimg.com/profile_images/895656725180813312/xmuU2NJv_400x400.jpg",
    title: 'Perry Street Prep PCS',
    id: 9
  },
  {
    img: "https://pbs.twimg.com/profile_images/378800000152200172/ce6a7a78db2c4a2ae6e74b6014da6bb9_400x400.jpeg",
    title: 'Two Rivers PCS',
    id: 6
  },


];

class LandingSchoolsGridList extends React.Component {

  render() {

    const { classes } = this.props;

      return (
        <Grid container
              alignItems='center'
              direction= 'row'
              justify= 'center'>
          <div className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList}>
              {tileData.map(tile => (
                <GridListTile key={tile.img}>
                  <img src={tile.img} alt={tile.title} />
                  <a>
                    <GridListTileBar
                      title={tile.title} />
                  </a>
                </GridListTile>
              ))}
            </GridList>
          </div>
        </Grid>
  );
    }
}

LandingSchoolsGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingSchoolsGridList);


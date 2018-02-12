import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid'
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
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
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.dark,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
});


const tileData = [
  {
    img: "https://pbs.twimg.com/profile_images/900102187933499392/vrbWtNB_.jpg",
    title: 'E.L. Haynes PCS',
    id: 1
  },
  {
    img: "https://i.vimeocdn.com/portrait/8834034_300x300",
    title: 'KIPP DC',
    id: 2
  },
  {
    img: "https://media.glassdoor.com/sqll/362024/paul-public-charter-school-squarelogo.png",
    title: 'Paul PCS',
    id: 3
  },
  {
    img: "http://www.dcprep.org/images/dcprep_logo.jpg",
    title: 'DC PREP',
    id: 4
  },
  {
    img: "https://pbs.twimg.com/profile_images/2499611872/ov32xj1wrupsyzrdmbzt.png",
    title: 'IDEA',
    id: 5
  },
  {
    img: "https://pbs.twimg.com/profile_images/900102187933499392/vrbWtNB_.jpg",
    title: 'E.L. Haynes PCS',
    id: 6
  },

];

class LandingSchoolsGridList extends React.Component {

  render() {

    const { classes } = this.props;

    return (
      <Grid container
            className={classes.root}
            alignItems='flex-start'
            direction= 'row'
            justify= 'center'
            spacing={24} >
        <Grid item xs={12} >
          <GridList className={classes.gridList} cols={2.5}>
            {tileData.map(tile => (
              <GridListTile key={tile.id} style={{ maxHeight: 'auto', width: 250 }}>
                <img src={tile.img} alt={tile.title}  />
                <GridListTileBar
                  title={tile.title}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                  actionIcon={
                    <IconButton>
                      <StarBorderIcon className={classes.title} />
                    </IconButton>
                  } />
              </GridListTile>
            ))}
          </GridList>
        </Grid>
      </Grid>
    );
    }
}

LandingSchoolsGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingSchoolsGridList);


import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import LabelIcon from '@material-ui/icons/Label';
import DraftsIcon from '@material-ui/icons/Drafts';

import axios from 'axios';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  label: {
    textDecoration: 'none',
  }
});

class LandingTaxonomyCategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  buildLink(category_id) {
    return "/categories/" + category_id
  }

  render () {
    const { classes, data } = this.props;

    return (
        <Grid container justify='center'>
          <Grid item xs={6}>
            <List component="categories-list">
              {data.map((category) => {
                return  <a key={category.sub_id} href={this.buildLink(category.sub_id)} className={classes.label}>
                          <ListItem button key={category.id}>
                            <ListItemIcon>
                              <LabelIcon />
                            </ListItemIcon>
                            <ListItemText primary={category.sub} />
                          </ListItem>
                        </a>
                }
              )}
            </List>
          </Grid>
        </Grid>
    )
  }
}

LandingTaxonomyCategoryList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingTaxonomyCategoryList);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';



const styles = theme => ({
  root: theme.mixins.gutters({
    padding: 16,
    paddingBottom: 16,
    margin: theme.spacing.unit * 3,
  }),
  link: {
    textDecoration: 'inherit',
    color: 'inherit',
    cursor: 'auto'
  }
});

const theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      popper: {
        width: 200
      },
    },
  },
});

class VendorShowCategoriesTags extends React.Component {

  handleClick() {

  }

  render() {
    const { classes, data } = this.props;

    return (
      <div>
      <Paper className={classes.root}>
        <Typography variant='subheading'>
          Does work in:
        </Typography>
        {data.categories_array.map((category) => {
          return (
            <a href={'/categories'+category.id} key={category.id} className={classes.link}>
              <Chip label={category.name} onClick={this.handleClick} className={classes.chip} />
            </a>
          )
          }
        )}
      </Paper>
      <MuiThemeProvider theme={theme}>
      <Tooltip
        title={data.schools_array.join(", ")}
        placement='bottom'
        >
      <Paper className={classes.root}>
        <Typography variant='subheading' align='center'>
          Contracted with
        </Typography>
        <Typography variant='display3' align='center'>
          {data.schools_array.length}
        </Typography>
        <Typography variant='subheading' align='center'>
          of us
        </Typography>
      </Paper>
      </Tooltip>
      </MuiThemeProvider>
      </div>
    );
  }
}

VendorShowCategoriesTags.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VendorShowCategoriesTags);

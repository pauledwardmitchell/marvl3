import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReactStars from 'react-stars'

import EditReviewDialog from './EditReviewDialog'
import EditProtipDialog from './EditProtipDialog'

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '50%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  stars: {
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 12,
    display: 'block'
  },
  paper: theme.mixins.gutters({
    padding: 16,
    margin: theme.spacing.unit * 3,
  })
});

class UserShowAllProtips extends React.Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  renderEditProtipDialogButton(protip) {
    if ( 1+1 === 2) {
      return ( <EditProtipDialog protip={protip} /> )
    } else {
      return ( <span></span> )
    }
  }

  render() {
    const { classes, data } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>

        {data.protips.map(protip => (
          <div key={protip.id} >
            <ExpansionPanel expanded={expanded === 'panel' + protip.id } onChange={this.handleChange('panel' + protip.id)}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Protip about {protip.category} on {protip.date_written}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid item xs={12}>
                  <Paper className={classes.paper} elevation={4}>
                    <Typography component="h3" variant='title' gutterBottom>{protip.title}</Typography>
                    <Typography component="h3" variant='subheading'>{protip.content}</Typography>
                    {this.renderEditProtipDialogButton(protip)}
                  </Paper>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        ))}

      </div>
    );
  }
}

UserShowAllProtips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserShowAllProtips);

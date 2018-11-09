import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { Doughnut } from 'react-chartjs-2';


const styles = theme => ({
  root: theme.mixins.gutters({
    padding: 16,
    margin: theme.spacing.unit * 3,
  }),
});

const options = {
  legend: {
    display: false
  },
  tooltips: {
    enabled: false
  }
}


class UserPointsChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  pointsRemainder() {
    const { points } = this.props;

    if (points > 400) {
      return 0
    } else {
      return 400 - points
    }

  }

  userStatus() {
    const { points } = this.props;

    switch(true) {
    case (points > 300):
        return "Gold Medal"
        break;
    case (points > 200):
        return "Silver Medal"
        break;
    case (points > 100):
        return "Bronze Medal"
        break;
    default:
        return "Beginner"
    }
  }

  render() {
    const { classes, points } = this.props;

    const chartData = {
      datasets: [
        {
          data: [points, this.pointsRemainder()],
          backgroundColor: ['rgba(255,99,132,1)', 'rgba(255,99,132,0.2)']
        }
      ]
    }

    return (
      <div>
        <Paper className={classes.root} elevation={4}>
          <Typography variant='subheading' align='center'>
            Your MARVL score: {points}
          </Typography>
          <Doughnut data={chartData} options={options}/>
          <Typography variant='subheading' align='center'>
            {this.userStatus()}
          </Typography>
        </Paper>
      </div>
    );
  }

}

UserPointsChart.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserPointsChart);

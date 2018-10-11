import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { HorizontalBar } from 'react-chartjs-2';

const styles = theme => ({
  root: theme.mixins.gutters({
    padding: 16,
    margin: theme.spacing.unit * 3,
  }),
});

const data = {
  labels: ['Amazing HVAC', 'Brilliant HVAC', 'Meh HVAC', 'Never Again HVAC'],
  datasets: [
    {
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      data: [10, 8, 2, 2]
    }
  ]
};


const options = {
  legend: {
    display: false
  },
  tooltips: {
    callbacks: {
      label: function(tooltipItem) {
               return tooltipItem.yLabel;
             }
    }
  },
  scales: {
    xAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
}

class CategoriesChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  buildChartData() {
    var vendorsData = this.props.data.vendors;
    var namesArray = [];
    var numReviewsArray = [];
    var i;
    for (i = 0; i < vendorsData.length; i++) {
      namesArray.push(vendorsData[i].name)
      numReviewsArray.push(vendorsData[i].reviews_count)
    }

    var chartData = {
      labels: namesArray,
      datasets: [
        {
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          data: numReviewsArray
        }
      ]
    }

    return chartData
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper className={classes.root} elevation={4}>
          <Typography variant='subheading' align='center'>
            Who we work with
          </Typography>
          <HorizontalBar data={this.buildChartData()} options={options}/>
        </Paper>
      </div>
    );
  }

}

CategoriesChart.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoriesChart);

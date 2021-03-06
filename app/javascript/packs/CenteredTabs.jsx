import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import axios from 'axios'

import CategoryExpansionPanel from './CategoryExpansionPanel'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

const data = [
  {
    "name": "Building / Grounds",
    "subCategories": [
    {
      "sub": "Contractor",
      "reviews": [
      {
        "vendorName": "Capital Contracting",
        "dateWritten": "31 December 2017",
        "stars": "5",
        "review": "Lorem ipsum dolor amet 3 wolf moon church-key yr, copper mug art party bushwick woke locavore intelligentsia subway tile kitsch whatever."
      },
      {
        "vendorName": "New City Contracting",
        "dateWritten": "3 December 2017",
        "stars": "5",
        "review": "Our building ipsum dolor amet 3 wolf moon church-key yr, copper mug art party bushwick woke locavore intelligentsia subway tile kitsch whatever."
      },
      {
        "vendorName": "Big Building Contracting",
        "dateWritten": "1 December 2017",
        "stars": "4",
        "review": "Lorem ipsum dolor amet 3 wolf moon church-key yr, copper mug art party bushwick woke locavore intelligentsia subway tile kitsch whatever."
      },
      {
        "vendorName": "Blah Contracting",
        "dateWritten": "31 September 2017",
        "stars": "1",
        "review": "Our building ipsum dolor amet 3 wolf moon church-key yr, copper mug art party bushwick woke locavore intelligentsia subway tile kitsch whatever."
      }
      ]
    },
    {
      "sub": "HVAC",
      "reviews": [
      {
        "vendorName": "Capital HVAC",
        "dateWritten": "31 December 2017",
        "stars": "5",
        "review": "Amet 3 wolf moon church-key yr, copper mug art party bushwick woke locavore intelligentsia subway tile kitsch whatever."
      },
      {
        "vendorName": "New City HVAC",
        "dateWritten": "31 March 2017",
        "stars": "3",
        "review": "The building 3 wolf moon church-key yr, copper mug art party bushwick woke locavore intelligentsia subway tile kitsch whatever."
      },
      {
        "vendorName": "Washington HVAC",
        "dateWritten": "1 December 2017",
        "stars": "4",
        "review": "Of course 3 wolf moon church-key yr, copper mug art party bushwick woke locavore intelligentsia subway tile kitsch whatever."
      }
      ]
    },
    {
      "sub": "Plumber",
      "reviews": [
      {
        "vendorName": "Capital Plumbing",
        "dateWritten": "31 December 2017",
        "stars": "5",
        "review": "Ipsum dolor amet 3 wolf moon church-key yr, copper mug art party bushwick woke locavore intelligentsia subway tile kitsch whatever."
      },
      {
        "vendorName": "Washington Plumbing",
        "dateWritten": "31 August 2017",
        "stars": "5",
        "review": "The blasted toilet dolor amet 3 wolf moon church-key yr, copper mug art party bushwick woke locavore intelligentsia subway tile kitsch whatever."
      },
      {
        "vendorName": "Baltimore Plumbing",
        "dateWritten": "2 February 2017",
        "stars": "5",
        "review": "These pipes man dolor amet 3 wolf moon church-key yr, copper mug art party bushwick woke locavore intelligentsia subway tile kitsch whatever."
      }
      ]
    }]

  },
  {
    "name": "Finance",
    "subCategories": [
    {
      "sub": "Accountant",
      "reviews": [
      {
        "vendorName": "Capital Accounting",
        "dateWritten": "31 December 2017",
        "stars": "5",
        "review": "Lorem ipsum dolor amet 3 wolf moon church-key yr, copper mug art party bushwick woke locavore intelligentsia subway tile kitsch whatever."
      }
      ]
    },
    {
      "sub": "Bookkeeping Software",
      "reviews": [
      {
        "vendorName": "QuickBooks",
        "dateWritten": "31 December 2017",
        "stars": "5",
        "review": "Lorem ipsum dolor amet 3 wolf moon church-key yr, copper mug art party bushwick woke locavore intelligentsia subway tile kitsch whatever."
      },
      {
        "vendorName": "Quicken",
        "dateWritten": "31 July 2017",
        "stars": "3",
        "review": "Numbers numbers Lorem ipsum dolor amet 3 wolf moon church-key yr, copper mug art party bushwick woke locavore intelligentsia subway tile kitsch whatever."
      },
      {
        "vendorName": "ABC Accounting",
        "dateWritten": "31 December 2017",
        "stars": "5",
        "review": "Lorem ipsum dolor amet 3 wolf moon church-key yr, copper mug art party bushwick woke locavore intelligentsia subway tile kitsch whatever."
      }
      ]
    },
    {
      "sub": "Consultant",
      "reviews": [
      {
        "vendorName": "Capital Consulting",
        "dateWritten": "31 December 2017",
        "stars": "5",
        "review": "Lorem ipsum dolor amet 3 wolf moon church-key yr, copper mug art party bushwick woke locavore intelligentsia subway tile kitsch whatever."
      },
      {
        "vendorName": "Capital Consulting",
        "dateWritten": "31 July 2017",
        "stars": "3",
        "review": "Lorem ipsum dolor amet 3 wolf moon church-key yr, copper mug art party bushwick woke locavore intelligentsia subway tile kitsch whatever."
      }
      ]
    }
    ]
  },
  {
    "name": "Human Resources",
    "subCategories": [
    {
      "sub": "Dental Insurance",
      "reviews": [
      {
        "vendorName": "Capital Dental",
        "dateWritten": "31 December 2017",
        "stars": "5",
        "review": "Lorem ipsum dolor amet 3 wolf moon church-key yr, copper mug art party bushwick woke locavore intelligentsia subway tile kitsch whatever."
      }
      ]
    },
    {
      "sub": "Health Insurance",
      "reviews": [
      {
        "vendorName": "Capital Health",
        "dateWritten": "31 December 2017",
        "stars": "5",
        "review": "Lorem ipsum dolor amet 3 wolf moon church-key yr, copper mug art party bushwick woke locavore intelligentsia subway tile kitsch whatever."
      }
      ]
    },
    {
      "sub": "Life Insurance",
      "reviews": [
      {
        "vendorName": "Capital Life",
        "dateWritten": "31 December 2017",
        "stars": "5",
        "review": "Lorem ipsum dolor amet 3 wolf moon church-key yr, copper mug art party bushwick woke locavore intelligentsia subway tile kitsch whatever."
      }
      ]
    }
    ]
  },
  {
    "name": "Technology",
    "subCategories": [
    {
      "sub": "Tech Consultant",
      "reviews": [
      {
        "vendorName": "Capital Consulting",
        "dateWritten": "31 December 2017",
        "stars": "5",
        "review": "Lorem ipsum dolor amet 3 wolf moon church-key yr, copper mug art party bushwick woke locavore intelligentsia subway tile kitsch whatever."
      }
      ]
    },
    {
      "sub": "Hardware",
      "reviews": [
      {
        "vendorName": "Capital Hardware",
        "dateWritten": "31 December 2017",
        "stars": "5",
        "review": "Lorem ipsum dolor amet 3 wolf moon church-key yr, copper mug art party bushwick woke locavore intelligentsia subway tile kitsch whatever."
      }
      ]
    },
    {
      "sub": "Software",
      "reviews": [
      {
        "vendorName": "Capital Software",
        "dateWritten": "31 December 2017",
        "stars": "5",
        "review": "Lorem ipsum dolor amet 3 wolf moon church-key yr, copper mug art party bushwick woke locavore intelligentsia subway tile kitsch whatever."
      }
      ]
    }
    ]
  }
]


const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
const thisAxios = axios.create({
  headers: {
    'X-CSRF-Token': csrfToken
  }
});


class CenteredTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  getCategories() {
    var categories;
    var i;
    for (i = 0; i < data.length; i++) {
      if (this.state.value === i) {
        categories = data[i].subCategories;
      }
    }
    return categories
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={24} justify='center'>
          <Grid item xs={11}>
            <AppBar position="static">
              <Tabs value={value} onChange={this.handleChange} centered>
                {data.map((superCategory) => {
                    return <Tab
                             key={superCategory.name}
                             label={superCategory.name}/>
                    }
                )}
              </Tabs>
            </AppBar>
            {value === 0 && <TabContainer><CategoryExpansionPanel data={this.getCategories()}/></TabContainer>}
            {value === 1 && <TabContainer><CategoryExpansionPanel data={this.getCategories()}/></TabContainer>}
            {value === 2 && <TabContainer><CategoryExpansionPanel data={this.getCategories()}/></TabContainer>}
            {value === 3 && <TabContainer><CategoryExpansionPanel data={this.getCategories()}/></TabContainer>}
          </Grid>
        </Grid>
      </div>
    );
  }
}

CenteredTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CenteredTabs);

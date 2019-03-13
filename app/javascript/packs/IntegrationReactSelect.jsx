import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import axios from 'axios'

const loadingSuggestions = [
  { label: 'Loading...' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 40,
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
const thisAxios = axios.create({
  headers: {
    'X-CSRF-Token': csrfToken
  }
});


class IntegrationReactSelect extends React.Component {
  state = {
    single: null,
    suggestions: loadingSuggestions,
  };

  endpoint() {
    if (this.props.reviewForm === true) {
      return '/search_vendors_suggestions'
    } else if (this.props.signupForm === true) {
      return '/signup_schools_suggestions'
    } else if (this.props.vendorForm === true || this.props.protipForm === true || this.props.categorySelect === true) {
      return '/search_categories_suggestions'
    } else {
      return '/landing_search_data'
    }
  }

  componentWillMount(){
    thisAxios.get(this.endpoint())
    .then((response) => {
      this.setState({suggestions: response.data})
    })
    .catch((error) => console.error('axios error', error))
  }

  handleChange = name => value => {
    if (this.props.reviewForm === true) {
      this.setState({ [name]: value }, () => { this.updateVendorId() });
    } else if (this.props.signupForm === true) {
      this.setState({ [name]: value }, () => { this.updateOrganizationId() });
    } else if (this.props.vendorForm === true || this.props.protipForm === true || this.props.categorySelect === true) {
      this.setState({ [name]: value }, () => { this.updateCategoryId() });
    } else {
      this.setState({ [name]: value });
    }
  };

  updateVendorId() {
    var vendor = this.state.single.label;
    var vendorData = this.state.suggestions;
    var vendorId = null;
    var i;

    if (this.state.single != null) {
      for (i = 0; i < vendorData.length; i++) {
        if (vendor === vendorData[i].label) {
          vendorId = vendorData[i].id
        }
      }
      this.props.handleVendorChange(vendorId)
    }
  }

  updateCategoryId() {
    var category = this.state.single.label;
    var categoryData = this.state.suggestions;
    var categoryId = null;
    var i;

    if (this.state.single != null) {
      for (i = 0; i < categoryData.length; i++) {
        if (category === categoryData[i].label) {
          categoryId = categoryData[i].id
        }
      }
      this.props.handleCategoryChange(categoryId)
    }
  }

  updateOrganizationId() {
    var organization = this.state.single.label;
    var organizationData = this.state.suggestions;
    var organizationId = null;
    var i;

    if (this.state.single != null) {
      for (i = 0; i < organizationData.length; i++) {
        if (organization === organizationData[i].label) {
          organizationId = organizationData[i].id
        }
      }
      this.props.handleOrganizationChange(organizationId)
    }
  }

  buildButtonLink = () => {
    if (this.state.single != null && this.state.single.type === "super_super_categories") {
      return "#taxonomy"
    } else if (this.state.single != null) {
      var searchTerm = this.state.single.label;
      var searchTermData = this.state.suggestions;
      var link = "";
      var newLink;
      var i;
      for (i = 0; i < searchTermData.length; i++) {
        if (searchTerm === searchTermData[i].label) {
          newLink = '/' + searchTermData[i].type + '/' + searchTermData[i].id
          console.log("built")
          link = newLink
        }
      }
      return link
    }
  }

  checkButtonStatus = () => {
    return false
  }


  searchGridNumber() {
    if (this.props.reviewForm === true || this.props.vendorForm === true || this.props.protipForm === true || this.props.categorySelect === true || this.props.signupForm === true) {
      return 12
    } else {
      return 7
    }
  }

  renderPlaceholder() {
    if (this.props.reviewForm === true) {
      return "Choose vendor"
    } else if (this.props.vendorForm === true) {
      return "This vendor does work in..."
    } else if (this.props.protipForm === true) {
      return "Choose category to write pro tip about..."
    } else if (this.props.categorySelect === true) {
      return "Choose category of work"
    } else if (this.props.signupForm === true) {
      return "Choose your organization"
    } else {
      return "Start typing what you are looking for..."
    }
  }

  renderButton() {
    if (this.props.reviewForm === true || this.props.vendorForm === true || this.props.protipForm === true || this.props.categorySelect === true || this.props.signupForm === true) {
      return (<span></span>)
    } else {
      return (<Grid item xs={1}><Button href={this.buildButtonLink()} disabled={this.checkButtonStatus()}>GO</Button></Grid>)
    }
  }

  render() {
    const { classes, theme } = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };

    return (
      <div className={classes.root}>
        <Grid container
              alignItems='flex-start'
              direction= 'row'
              justify= 'center'>
          <Grid item xs={this.searchGridNumber()}>
            <NoSsr>
              <Select
                classes={classes}
                styles={selectStyles}
                options={this.state.suggestions}
                components={components}
                value={this.state.single}
                onChange={this.handleChange('single')}
                placeholder={this.renderPlaceholder()}
                noOptionsMessage={() => "No results. \n Looking for a vendor? Add them to MARVL now! \n Looking for a specific category? Try a broader category (\"Flooring\" instead of \"Tile\" or \"Carpet\"), or email amy@cpa.coop to propose a new category."}
              />
            </NoSsr>
          </Grid>
          {this.renderButton()}
        </Grid>
      </div>
    );
  }
}

IntegrationReactSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(IntegrationReactSelect);

import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = theme => ({
  link: {
    textDecoration: 'none'
  }
})

class LandingProfileMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <IconButton
          aria-owns={anchorEl ? 'landing-profile-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <a href={'/users/'+this.props.userId} style={{ textDecoration: 'none' }}>
            <MenuItem onClick={this.handleClose}>My profile</MenuItem>
          </a>
          <a href='/confirm_signout' style={{ textDecoration: 'none' }}>
            <MenuItem onClick={this.handleClose}>Logout</MenuItem>
          </a>
        </Menu>
      </div>
    );
  }
}

export default LandingProfileMenu;

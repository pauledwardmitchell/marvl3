import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import MapsDirectionsBus from 'material-ui/svg-icons/maps/directions-bus';
import DeviceDevices from 'material-ui/svg-icons/device/devices';
import WhatsHot from 'material-ui/svg-icons/social/whatshot';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import SocialPeople from 'material-ui/svg-icons/social/people';
import SocialNotificationsActive from 'material-ui/svg-icons/social/notifications-active';
import PlacesKitchen from 'material-ui/svg-icons/places/kitchen';
import NotificationAdb from 'material-ui/svg-icons/notification/adb';
import NotificationPower from 'material-ui/svg-icons/notification/power';
import ImageTexture from 'material-ui/svg-icons/image/texture';
import ImageMusicNote from 'material-ui/svg-icons/image/music-note';
import ImageWbIridescent from 'material-ui/svg-icons/image/wb-iridescent';
import ImageBrush from 'material-ui/svg-icons/image/brush';
import ActionLock from 'material-ui/svg-icons/action/lock';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionBuild from 'material-ui/svg-icons/action/build';
import ActionGavel from 'material-ui/svg-icons/action/gavel';
import EditorFormatPaint from 'material-ui/svg-icons/editor/format-paint'

export default class DrawerUndockedExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  getIcon(categoryName) {
    switch(categoryName) {
    case "Buses":
      return (<MapsDirectionsBus />)
      break;
    case "Computer / IT":
      return (<DeviceDevices />)
      break;
    case "Carpet / Flooring":
      return (<ImageTexture />)
      break;
    case "Doors":
      return (<ActionHome />)
      break;
    case "Electrician":
      return (<NotificationPower />)
      break;
    case "Fire Alarm":
      return (<SocialNotificationsActive />)
      break;
    case "Locksmith":
      return (<ActionLock />)
      break;
    case "Metal Refinishing":
      return (<ImageBrush />)
      break;
    case "Painter":
      return (<EditorFormatPaint />)
      break;
    case "Pest Control":
      return (<NotificationAdb />)
      break;
    case "Pipe Organ Repair":
      return (<ImageMusicNote />)
      break;
    case "Plumber":
      return (<ActionBuild />)
      break;
    case "Roofers":
      return (<ActionHome />)
      break;
    case "Security Personnel":
      return (<SocialPeople />)
      break;
    case "Security Systems":
      return (<SocialNotificationsActive />)
      break
    case "Stained Glass Repair":
      return (<ImageWbIridescent />)
      break;
    case "Stone Mason":
      return (<ActionGavel />)
      break;
    default:
      return (<ActionBuild />)
    }
  }

  render() {
    return (
      <div>
        <RaisedButton
          style={{margin: 4}}
          label="All Categories"
          onClick={this.handleToggle} />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <List>
            {this.props.categories.map((category) => (
              <ListItem
                key={category.id}
                primaryText={category.name}
                leftIcon={this.getIcon(category.name)} />
              ))}
          </List>
        </Drawer>
      </div>
    );
  }
}

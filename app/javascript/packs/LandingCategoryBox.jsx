import React from 'react'

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import Icon from 'material-ui/Icon';
import StarBorderIcon from 'material-ui-icons/StarBorder';
import DirectionsBusIcon from 'material-ui-icons/DirectionsBus';
import DevicesIcon from 'material-ui-icons/Devices'


export default class LandingCategoryBox extends React.Component {

  renderIcon(type) {
    if (type === 'bus') {
      return <DirectionsBusIcon style={{ width: 100, height: 100, display: 'inline-flex', margin: 25}}/>
    } if (type === 'accounting') {
      return <DevicesIcon style={{ width: 100, height: 100, display: 'inline-flex', margin: 25}}/>
    } else {
      return <StarBorderIcon style={{ width: 100, height: 100, display: 'inline-flex', margin: 25}}/>
    }
  }

  renderText(type) {
    if (type === 'bus') {
      return 'BUS RENTAL'
    } if (type === 'accounting') {
      return 'ACCOUNTING'
    } else {
      return 'WHAT ELSE'
    }
  }

  render () {
    return (
      <Paper className='shadow2' style={{ width: 150, height: 170, display: 'inline-flex', margin: 25 }}>
        {this.renderIcon(this.props.type)}
        <Typography component="p" style={{display: 'inline-flex'}}>
          Test
        </Typography>
      </Paper>
    )
  }
}

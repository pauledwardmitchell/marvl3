import React from 'react'

import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';

import IntegrationAutosuggest from './IntegrationAutosuggest'


export default class LandingSearch extends React.Component {

  render () {
    return (

      <div style={{position: 'relative', paddingBottom: 100}}>
        <IntegrationAutosuggest style={{}} categories={this.props.categories} vendors={this.props.vendors} tests={this.props.tests}/>
        <Button style={{ position: 'absolute', top: -8, right: '12.5%' }}>SEARCH</Button>
      </div>

    )
  }
}

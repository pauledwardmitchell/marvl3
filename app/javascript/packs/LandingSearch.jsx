import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';


import axios from 'axios'

const colors = [
  'Red',
  'Orange',
  'Yellow',
  'Green',
  'Blue',
  'Purple',
  'Black',
  'White',
];

const fruit = [
"Doors",
"Electrician",
"Hardscapes",
"HVAC",
"Insurance",
"Kitchen",
"Cleaning",
"Painter",
"Pest Control",
"Pipe Organ Repair",
"Carpet / Flooring",
"Fire Alarm ",
"Kitchen Fire Hood and Grease Screen Cleaning",
"Metal refinishing",
"Plumber",
"Promotional Materials",
"Roofers",
"Stained Glass Repair",
"Stone Mason",
"Security Systems",
"Computers / IT",
"Security Personnel",
"Concrete Contractors",
"Solar",
"Waste Hauling",
"Landscaping/Snow Removal",
"Copiers",
"Handyman",
"Buses",
"Locksmith"
];

/**
 * Two examples of filtering. The first uses `caseInsensitiveFilter`, the second uses `fuzzyFilter`,
 * and limits the number of results displayed using the `maxSearchResults` property.
 */

const style = {
  position: 'relative',
  margin: 'auto',
  marginTop: 20,
  paddingTop: 3,
  paddingLeft: 20,
  paddingRight: 20,
  paddingBottom: 10,
  width: 500,
  textAlign: 'left',
};

export default class LandingSearch extends React.Component {

  constructor(props) {
    super(props);
    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.state = {categoriesData: [],
                  searchText: ""};
  }

  componentDidMount() {
    axios.get(`https://www.marvl.org/data`)
      .then((response) => {
        this.setState({categoriesData: response.data})
      })
      .catch((error) => console.error('axios error', error))
  }

  getCategories(categoriesData) {
    var categoriesArray = []
    for ( var i = 0; i < categoriesData.length; i++) {
      categoriesArray.push(categoriesData[i].name)
    }
    return categoriesArray
  }

  categoryIdFromName(name) {
    var categoryId = 0
    var categoriesArray = this.state.categoriesData
    for ( var i = 0; i < categoriesArray.length; i++) {
      if (name === categoriesArray[i].name) {
        categoryId = categoriesArray[i].id
      }
    }
    return categoryId
  }

  buildLink() {
    debugger
    if (this.state.searchText === "") {
      return "/reviews"
    } else if (this.getCategories(this.state.categoriesData).includes(this.state.searchText)) {
      return "/categories/"+this.categoryIdFromName(this.state.searchText)
    } else {
    return "/reviews"
    }
  }

  onUpdateInput(searchText) {
    this.setState({searchText: searchText})
  }

  render() {
    return (
      <Paper style={style} >
        <h3 style={{textAlign: 'center'}}>Get matched to top-rated pros and browse exclusive reviews</h3>
        <AutoComplete
          style={{marginLeft: 70}}
          floatingLabelText="Type category or vendor"
          filter={AutoComplete.fuzzyFilter}
          dataSource={this.getCategories(this.state.categoriesData)}
          maxSearchResults={5}
          onUpdateInput={this.onUpdateInput} />
        <a href={this.buildLink()}>
          <RaisedButton label="Search" primary={true} style={{margin: 12}} />
        </a>
      </Paper>
    )
  }
}

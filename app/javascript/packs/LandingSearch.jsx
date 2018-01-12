import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';


import axios from 'axios'


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
  marginTop: 100,
  paddingTop: 3,
  paddingLeft: 20,
  paddingRight: 20,
  paddingBottom: 10,
  width: 650,
  textAlign: 'left',
};

export default class LandingSearch extends React.Component {

  constructor(props) {
    super(props);
    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.state = {categoriesData: [],
                  vendorsData: [],
                  searchText: ""};
  }

  componentDidMount() {
    axios.get(`https://www.marvl.org/data`)
      .then((response) => {
        this.setState({categoriesData: response.data.categories,
                       vendorsData: response.data.vendors})
      })
      .catch((error) => console.error('axios error', error))
  }

  getSearchTerms() {
    var searchTerms = this.getCategories(this.state.categoriesData)
    var vendorsData = this.state.vendorsData
    for ( var i = 0; i < vendorsData.length; i++) {
      searchTerms.push(vendorsData[i].name)
    }
    return searchTerms
  }

  getCategories(categoriesData) {
    var categoriesArray = []
    for ( var i = 0; i < categoriesData.length; i++) {
      categoriesArray.push(categoriesData[i].name)
    }
    return categoriesArray
  }

  getVendors(vendorsData) {
    var vendorsArray =[]
    for ( var i = 0; i < vendorsData.length; i++) {
      vendorsArray.push(vendorsData[i].name)
    }
    return vendorsArray
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

  vendorIdFromName(name) {
    var vendId = 0
    var fullVendorData = this.state.vendorsData
    for ( var i = 0; i < fullVendorData.length; i++) {
      if (name === fullVendorData[i].name) {
        vendId = fullVendorData[i].id
      }
    }
    return vendId
  }

  buildLink() {
    if (this.state.searchText === "") {
      return "/reviews"
    } else if (this.getCategories(this.state.categoriesData).includes(this.state.searchText)) {
      return "/categories/"+this.categoryIdFromName(this.state.searchText)
    } else if (this.getVendors(this.state.vendorsData).includes(this.state.searchText)) {
      return "/vendors/"+this.vendorIdFromName(this.state.searchText)
    } else {
      return "/vendors/new"
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
          style={{marginLeft: 70, width: 350}}
          textFieldStyle={{width: 350}}
          listStyle={{width: 350}}
          floatingLabelText="Type category or vendor"
          filter={AutoComplete.fuzzyFilter}
          dataSource={this.getSearchTerms()}
          maxSearchResults={5}
          onUpdateInput={this.onUpdateInput} />
        <a href={this.buildLink()}>
          <RaisedButton label="Search" primary={true} style={{margin: 12}} />
        </a>
      </Paper>
    )
  }
}

import React, { Component } from 'react'
import '../CSS/FilterCities.css';

export default class FilterCities extends Component {

    // state = {
    //     cityFilter: ""
    //   }



    render() {
        return (
            <div className = "cityfilter-input-box">
                 <label htmlFor="filter">Filter by City: </label>
        <input type="text" id="filter" 
    
          onChange={this.props.onChangeValue}
          />
            </div>
        )
    }
}

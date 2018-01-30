/* global google */
/* eslint-disable no-undef */
import React from 'react'
import {  GoogleMap, Marker} from "react-google-maps"
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types'
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox")
const _ = require("lodash");
class SearchBoxs extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }


     onPlacesChanged= () => {
       const places = this.refs.searchBox.getPlaces();
       const bounds = new google.maps.LatLngBounds();
       places.forEach(place => {
         if (place.geometry.viewport) {
           bounds.union(place.geometry.viewport)
         } else {
           bounds.extend(place.geometry.location)
         }
       });
       const nextMarkers = places.map(place => ({
         position: place.geometry.location,
       }));
       const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

       this.setState({
         center: nextCenter,
         markers: nextMarkers,
       });
       console.log(this.state)
       // refs.map.fitBounds(bounds);
     }

  render() {
    return(
    <SearchBox
       ref="searchBox"
       bounds={this.bounds}
       controlPosition={google.maps.ControlPosition.TOP_LEFT}
       onPlacesChanged={this.onPlacesChanged}
     >
       <input
         type="text"
         placeholder="Customized your placeholder"
         style={{
           boxSizing: `border-box`,
           border: `1px solid transparent`,
           width: `240px`,
           height: `32px`,
           marginTop: `27px`,
           padding: `0 12px`,
           borderRadius: `3px`,
           boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
           fontSize: `14px`,
           outline: `none`,
           textOverflow: `ellipses`,
         }}
       />
     </SearchBox>

  )

  }


}


const mapStateToProps = (state) => ({
  mrs:state.mrs,
  size:state.size,
  mode:state.mode
})


export default connect( mapStateToProps )(SearchBoxs );

/* global google */
/* eslint-disable no-undef */
import React from 'react'
import {  GoogleMap, Marker} from "react-google-maps"
import { centerListSpot } from '../actions'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types'


class Markers extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      this.props.spots.map((spot) =>
      <Marker position={{ lat: spot.lat, lng: spot.lng}}
        key={spot.id}
        //http://kml4earth.appspot.com/icons.html
        icon={(spot.lat===this.props.statusPoint.center.lat && spot.lng===this.props.statusPoint.center.lng)?
        {url: 'http://maps.google.com/mapfiles/kml/paddle/wht-blank.png',scaledSize:new google.maps.Size(18, 18)}: {url: 'http://maps.google.com/mapfiles/kml/paddle/wht-blank-lv.png',scaledSize:new google.maps.Size(8, 8)}}
        //icon={(spot.lat===this.props.center.lat && spot.lng===this.props.center.lng)? '' : {url: 'http://maps.google.com/mapfiles/kml/paddle/wht-blank-lv.png'}}
        onMouseOver={this.handleOnMouseOver}
      />
      )
    )
  }

  handleOnMouseOver= (e) => {
    const payload= {lat: e.latLng.lat(),lng:e.latLng.lng()}
    this.props.centerListSpot (payload)
  }
}


const mapStateToProps = (state) => ({
  spots:state.spots,
  statusPoint:state.statusPoint,
  mode:state.mode
})

const mapDispatchToProps = {
  centerListSpot: centerListSpot
}



export default connect( mapStateToProps,mapDispatchToProps )(Markers );

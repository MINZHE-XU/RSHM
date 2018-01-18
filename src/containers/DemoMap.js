/* eslint-disable no-undef */
/* global google */
import React from 'react'
import  Component from 'react'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import { addSpot,clickListSpot,centerListSpot } from '../actions'
import { GroundOverlay, withScriptjs, withGoogleMap, GoogleMap, Marker, Rectangle  } from "react-google-maps"
import Markers from './MarkerContainer'

class DemoMap extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      visible: true,
    }
  }
  handleMapClick = (e) => {
  const payload= {lat: e.latLng.lat(),lng:e.latLng.lng()}
  const r=this.props.addSpot (payload)
  this.props.clickListSpot (r)
  this.props.centerListSpot (r)
  }

  handleOnMouseOut = (e) => {
    const payload= {id:-1,lat: 1000,lng:1000}
    this.props.centerListSpot (payload)
  }

  render() {
    return (
      <MyMapComponent
        spots={this.props.spots}
        center={this.props.center}
        mode={this.props.mode}
        onClick={this.handleMapClick}
        onMouseOut={this.handleOnMouseOut}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA1AZfv7mJ0-GTkCeYuQDL34-OaqSCQWmo&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>

  <GoogleMap
    defaultZoom={8}
    onClick={props.onClick}
    onMouseOut={props.onMouseOut}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    onZoomChanged={props.onZoomChanged}
  >
  <Markers />

  {props.spots.map((spot) =>
    <Rectangle
    key={spot.id}
            visible= {props.mode==='rectangle'}
            bounds= {{
              north: spot.lat+0.5,
              south: spot.lat-0.5,
              east: spot.lng+0.5,
              west: spot.lng-0.5
            }}
            options={{strokeWeight: 0,
              fillOpacity: 0.1,
              clickable: false,
              draggable: false,
              editable: false

              }
            }
    />
  )}

  </GoogleMap>
))

const mapStateToProps = (state) => ({
  spots:state.spots,
  center:state.center,
  mode:state.mode
})

const mapDispatchToProps = {
  addSpot: addSpot,
  clickListSpot: clickListSpot,
  centerListSpot: centerListSpot
}

export default connect( mapStateToProps,mapDispatchToProps )(DemoMap);

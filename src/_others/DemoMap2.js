import React from 'react'
import  Component from 'react'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import { addSpot,clickListSpot } from '../actions'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Rectangle  } from "react-google-maps"


class DemoMap extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      visible: true,
    }
  }
  handleItemClick = (e) => {
  const payload= {lat: e.latLng.lat(),lng:e.latLng.lng()}
  this.props.addSpot (payload)
  }
  handleMarkerClick = (e) => {
    const payload= {lat: e.latLng.lat(),lng:e.latLng.lng()}
    this.props.clickListSpot (payload)
  }
  render() {

    return (
      <MyMapComponent
        isMarkerShown={true}
        spots={this.props.spots}
        center={this.props.center}
        mode={this.props.mode}
        onClick={this.handleItemClick}
        onMarkerClick={this.handleMarkerClick}
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
    spots={props.spots}
    onClick={props.onClick}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    onZoomChanged={props.onZoomChanged}
  >
  {props.spots.map((spot) =>
    <Marker position={{ lat: spot.lat, lng: spot.lng}}
    visible= {props.mode==='point'}
    key={spot.id}
    icon={(spot.lat===props.center.lat && spot.lng===props.center.lng)? '' : 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'}
    onClick={props.onMarkerClick}
  />
  )}
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
  clickListSpot: clickListSpot
}

export default connect( mapStateToProps,mapDispatchToProps )(DemoMap);

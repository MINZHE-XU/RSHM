/* eslint-disable no-undef */
/* global google */
import React from 'react'
import  Component from 'react'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import { addSpot,addSpotForMRs,deleteSpotForMRs,clickListSpot,centerListSpot,updateMRs } from '../actions'
import { GroundOverlay, withScriptjs, withGoogleMap, GoogleMap, Marker, Rectangle ,DrawingManager } from "react-google-maps"
import Markers from './MarkerContainer'
import PolylineContainer from './PolylineContainer'
import Shades from '../components/Shades'
import MRs from './MRs'
import SearchBoxs from './SearchBoxs'
import DrawingManagers from './DrawingManagers'


class DemoMap extends React.PureComponent {

  constructor() {
    super()
    this.state = {
      visible: true,
    }
  }


  handleMapClick = (e) => {
    if (this.props.mode.show==="point"){
      const payload= {id:-1,lat: e.latLng.lat(),lng:e.latLng.lng(),isDynamic:false}
      const r=this.props.addSpot (payload)
      //console.log({spots:{lat:payload.lat, lng:payload.lng}, size:this.props.size})
      if(this.props.mode.algorithm==='local'){
        this.props.addSpotForMRs ({spots:{lat:payload.lat, lng:payload.lng}, size:this.props.size})
      }else{
        this.props.updateMRs({size:this.props.size});
      }
      this.props.clickListSpot (r)
      this.props.centerListSpot (r)
    }
  }

  handleOnMouseOut = (e) => {
    const payload= {id:-1,lat: 1000,lng:1000}
    this.props.centerListSpot (payload)
  }

  render() {

    return (
      <MyMapComponent
        onClick={this.handleMapClick}
        onMouseOut={this.handleOnMouseOut}
        onBoundsChanged={this.handleOnBoundsChanged}
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
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    onClick={props.onClick}
    onMouseOut={props.onMouseOut}
    onBoundsChanged={props.onBoundsChanged}

    //onZoomChanged={props.onZoomChanged}
  >
  <Markers />
  <DrawingManagers  />
  <SearchBoxs />
  <MRs />
  <PolylineContainer />
  </GoogleMap>
))


const mapStateToProps = (state) => ({
  spots:state.spots,
  center:state.center,
  mode:state.mode,
  size:state.size
})

const mapDispatchToProps = {
  addSpot: addSpot,
  updateMRs: updateMRs,
  addSpotForMRs: addSpotForMRs,
  clickListSpot: clickListSpot,
  centerListSpot: centerListSpot
}

export default connect( mapStateToProps,mapDispatchToProps )(DemoMap);

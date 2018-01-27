/* global google */
/* eslint-disable no-undef */
import React from 'react'
import {  GoogleMap } from "react-google-maps"
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import { addOnePath } from '../actions'
const { DrawingManager } = require("react-google-maps/lib/components/drawing/DrawingManager");

class DrawingManagers extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: true
    }
  }

  render() {
    return (
      <DrawingManager
      ref='manager'
           defaultOptions={{
             drawingControl: true,
             drawingControlOptions: {
               position: google.maps.ControlPosition.TOP_RIGHT,
               drawingModes: [
                 google.maps.drawing.OverlayType.POLYLINE
               ],
             },
             polylineOptions: {
               //this.props.mode.show==="point"
               visible: false ,
               strokeWeight: 0.5,
               strokeColor:'white',
               zIndex:-2
             },
           }}
           onPolylineComplete={this.handlePolylineComplete}
         />

      )
  }

  handlePolylineComplete= (e) => {

    console.log(e.getPath().b)
    //let mm=e.getPath().b
    //let aaa={position: new google.maps.LatLng(mm[0][0], mm[0][1])}
    //console.log(aaa)
    this.props.addOnePath( {path:e.getPath().b})

  }

}
const mapDispatchToProps = {
  addOnePath:addOnePath

}

const mapStateToProps = (state) => ({
  size:state.size,
  mode:state.mode
})


export default connect(  mapStateToProps,mapDispatchToProps )(DrawingManagers );

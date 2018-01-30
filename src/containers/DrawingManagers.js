/* global google */
/* eslint-disable no-undef */
import React from 'react'
import {  GoogleMap } from "react-google-maps"
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import { addOnePath ,addSpot,addSpotForMRs,updateMRs,clickListSpot ,centerListSpot } from '../actions'
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
               position: google.maps.ControlPosition.TOP_CENTER,
               drawingModes: [
                 google.maps.drawing.OverlayType.MARKER,
                 google.maps.drawing.OverlayType.POLYLINE
               ],
             },
             polylineOptions: {
               //this.props.mode.show==="point"
               visible: false ,
               strokeWeight: 2,
               strokeColor:'yellow',
               zIndex:-2
             },
             markerOptions: {
               //this.props.mode.show==="point"
               visible: false
             },
           }}
           onMarkerComplete={this.handleMarkerComplete}
           onPolylineComplete={this.handlePolylineComplete}
         />

      )
  }

  handlePolylineComplete= (e) => {
    console.log(e.getPath().b)
    this.props.addOnePath( {path:e.getPath().b})
  }
  handleMarkerComplete= (e) => {
    console.log(e.position)

      if (this.props.mode.show==="point"){
        const payload= {id:-1,lat: e.position.lat(),lng:e.position.lng(),isDynamic:false}
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

}
const mapDispatchToProps = {
  addOnePath:addOnePath,
  addSpot:addSpot,
  addSpotForMRs:addSpotForMRs,
  updateMRs:updateMRs,
  clickListSpot :clickListSpot ,
  centerListSpot:centerListSpot



}

const mapStateToProps = (state) => ({
  size:state.size,
  mode:state.mode
})


export default connect(  mapStateToProps,mapDispatchToProps )(DrawingManagers );

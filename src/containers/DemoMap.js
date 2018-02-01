/* eslint-disable no-undef */
/* global google */
import React from 'react'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import { addSpot,addSpotForMRs,deleteSpotForMRs,clickListSpot,centerListSpot,updateMRs,undateCandidateSpot } from '../actions'
import { GroundOverlay,  Rectangle ,DrawingManager } from "react-google-maps"
import Markers from './MarkerContainer'
import CandidateMarkers from './CandidateMarkerContainer'
import PolylineContainer from './PolylineContainer'
import Shades from '../components/Shades'
import MRs from './MRs'
import SearchBoxs from './SearchBoxs'
import DrawingManagers from './DrawingManagers'
import DroneContainer from './DroneContainer'

const _ = require("lodash");
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require("react-google-maps");
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");



const DemoMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyA1AZfv7mJ0-GTkCeYuQDL34-OaqSCQWmo&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {

      const refs = {}

      this.setState({
        bounds: null,
        center: {
          lat: -37.80123932755578, lng: 144.96047973632812
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
          const customMapType = new google.maps.StyledMapType([
              {
                elementType: 'labels',
                stylers: [{visibility: 'off'}]
              }
            ], {
              name: 'Custom Style'
          });
          const customMapTypeId = 'custom_style';
          //refs.map.mapTypes.set(customMapTypeId, customMapType);
          //refs.map.setMapTypeId(customMapTypeId);
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
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

          this.props.undateCandidateSpot(this.state.markers.map((spot,index) =>{return {id:-1, number:index, lat:spot.position.lat(), lng: spot.position.lng()}}))// refs.map.fitBounds(bounds);
        },

        onMouseOut : (e) => {
          const payload= {id:-1,lat: 1000,lng:1000, type:"unknown"}
          this.props.centerListSpot (payload)
        },

      })
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={13}
    clickableIcons={false}
    defaultExtraMapTypes={[
      ['custom_style', new google.maps.StyledMapType([
            {
              elementType: 'labels',
              stylers: [{visibility: 'off'}]
            }
          ], {
            name: 'Custom Style'
        })]
    ]}
    defaultMapTypeId={'custom_style'}
    options={{mapTypeControl:false}}

    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
    onClick={props.onClick}
    onMouseOut={props.onMouseOut}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Search place here"
        style={boxStyle}
      />
    </SearchBox>
    <Markers />
    <CandidateMarkers />
    <DroneContainer />
    <DrawingManagers  />
    <MRs />
    <PolylineContainer />
  </GoogleMap>
);

const mapStateToProps = (state) => ({
  spots:state.spots,
  center:state.center,
  mode:state.mode,
  size:state.size,
  statusPoint:state.statusPoint
})

const mapDispatchToProps = {
  addSpot: addSpot,
  updateMRs: updateMRs,
  addSpotForMRs: addSpotForMRs,
  clickListSpot: clickListSpot,
  centerListSpot: centerListSpot,
  undateCandidateSpot:undateCandidateSpot
}

export default connect( mapStateToProps,mapDispatchToProps )(DemoMap);

const boxStyle={
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
}

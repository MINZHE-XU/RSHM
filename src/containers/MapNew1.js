import React from "react"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import  Component from 'react'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import SpotList from '../components/SpotList'
import { clickListSpot } from '../actions'

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
))

<MyMapComponent
  isMarkerShown
  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA1AZfv7mJ0-GTkCeYuQDL34-OaqSCQWmo&v=3.exp&libraries=geometry,drawing,places"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
/>


class MyFancyComponent extends React.PureComponent {
  state = {
    isMarkerShown: false,
  }

  componentDidMount() {
    this.delayedShowMarker()
  }


  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    console.log('sadasd')
    return (
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    )
  }
}


const mapStateToProps = (state) => ({
  spots:state.spots
})

 const mapDispatchToProps = {
   clickListSpot: clickListSpot
 }


export default connect( mapStateToProps,mapDispatchToProps )(MyFancyComponent);

/* global google */
/* eslint-disable no-undef */
import React from 'react'
import {  GoogleMap, Rectangle } from "react-google-maps"
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types'

const white_point_marker= 'http://maps.google.com/mapfiles/kml/paddle/wht-blank.png'


class Shades extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      this.props.spots.map((spot) =>
        <Rectangle
        key={spot.id}
        visible={this.props.mode.show==="point"}
                bounds= {{
                  north: spot.lat+this.props.size.height/2,
                  south: spot.lat-this.props.size.height/2,
                  east: spot.lng+this.props.size.length/2,
                  west: spot.lng-this.props.size.length/2
                }}
                options={{strokeWeight: 0,
                  fillOpacity: 0.1,
                  clickable: false,
                  draggable: false,
                  editable: false
                  }
                }
        />
      )
    )
  }


}


const mapStateToProps = (state) => ({
  spots:state.spots,
  size:state.size,
  mode:state.mode

})


export default connect( mapStateToProps )(Shades );

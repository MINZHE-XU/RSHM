/* global google */
/* eslint-disable no-undef */
import React from 'react'
import {  GoogleMap, Rectangle } from "react-google-maps"
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types'


class MRs extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      this.props.mrs.map((mr) =>

        <Rectangle
        key={mr.id}
        visible={this.props.mode==="rectangle"}
                bounds= {{
                  north: mr.north,
                  south: mr.south,
                  east: mr.east,
                  west: mr.west
                }}
                options={{strokeWeight: 0,
                  fillOpacity: mr.rs * 0.1,
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
  mrs:state.mrs,
  size:state.size,
  mode:state.mode
})


export default connect( mapStateToProps )(MRs );

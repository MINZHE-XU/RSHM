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
    this.state = {
      coloredID: -1
    }
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
                options={{strokeWeight: (this.state.coloredID===mr.id) ? 1 : 0.1 ,
                  fillOpacity: mr.rs * 0.1,
                  draggable: false,
                  editable: false,
                  fillColor:(this.state.coloredID===mr.id) ? "red" : "black" ,
                  strokeColor: (this.state.coloredID===mr.id) ? "red" : "black"
                  }
                }
        onMouseOut={() =>this.handleOnMouseOut(mr.id)}
        onMouseOver={() =>this.handleOnMouseOver(mr.id)}
        />
      )
    )
  }
  handleOnMouseOver= (id, e) => {
    this.setState({ coloredID: id})
    console.log("on")
  }

  handleOnMouseOut= (id,e) => {
      this.setState({ coloredID: -1})
      console.log("out")
  }

}


const mapStateToProps = (state) => ({
  mrs:state.mrs,
  size:state.size,
  mode:state.mode
})


export default connect( mapStateToProps )(MRs );

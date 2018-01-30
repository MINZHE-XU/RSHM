/* global google */
/* eslint-disable no-undef */
import React from 'react'
import {  GoogleMap, Polyline } from "react-google-maps"
import { clickListSpot,centerListSpot,addSpot,deleteSpot,addSpotForMRs,deleteSpotForMRs } from '../actions'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types'

const white_point_marker= 'http://maps.google.com/mapfiles/kml/paddle/wht-blank.png'


class PolylineContainer extends React.Component {
  constructor() {
    super();

  }

  componentWillReceiveProps(nextProps) {
    //console.log("this.props.path")
    //console.log(this.props.path)
    if  (this.props.path!==nextProps.path){
      //console.log("stored path")
      //console.log(nextProps.path)
      const currentSpotToSearch =  this.props.spots
      nextProps.path.map(function(apath, index){
        let indexToDelete = currentSpotToSearch.findIndex(
          function(spot){
            return spot.id === apath.id;
          }
        )
        if(indexToDelete>=0){
          //find thing to update
          //console.log("currentSpotToSearch[indexToDelete]")
          //console.log(currentSpotToSearch[indexToDelete])
          //console.log("nextProps.path[index]")
          //console.log(nextProps.path[index])

          //if in the last point, we donnot need to update.
          if (currentSpotToSearch[indexToDelete].lat!==nextProps.path[index].path[0].lat() && currentSpotToSearch[indexToDelete].lng!==nextProps.path[index].path[0].lng()){
            nextProps.deleteSpot(currentSpotToSearch[indexToDelete])
            if(nextProps.mode.algorithm==='local'){
              nextProps.deleteSpotForMRs({spots:currentSpotToSearch[indexToDelete], size:nextProps.size})
            }
            nextProps.addSpot({id:apath.id,lat:apath.path[0].lat() ,lng:apath.path[0].lng(),isDynamic:true})
            if(nextProps.mode.algorithm==='local'){
              nextProps.addSpotForMRs ({spots:{id:apath.id,lat:apath.path[0].lat() ,lng:apath.path[0].lng(),isDynamic:true}, size:nextProps.size})
            }
          }else{
            console.log("the same!!!!!!!!!!!!!!")
          }

        }else{
          nextProps.addSpot({id:apath.id,lat:apath.path[0].lat() ,lng:apath.path[0].lng(),isDynamic:true})
          if(nextProps.mode.algorithm==='local'){
            nextProps.addSpotForMRs ({spots:{id:apath.id,lat:apath.path[0].lat() ,lng:apath.path[0].lng(),isDynamic:true}, size:nextProps.size})
          }
        }
          //console.log(apath)
        })

    }
  }

  render() {
    return (
      this.props.path.map((apath) =>
      <Polyline path={apath.path}
        key={apath.id}
        visible={true}
        options= {{
          visible: this.props.mode.show==="point" ,
          strokeWeight: 0.5,
          strokeColor:'green',
          zIndex:-1
        }}

      />
      )
    )
  }




  handleOnMouseOver= (spot, e) => {
    this.props.centerListSpot (spot)
  }

  handleOnClick= (spot,e) => {
    this.props.clickListSpot (spot)
  }
}


const mapStateToProps = (state) => ({
  spots:state.spots,
  statusPoint:state.statusPoint,
  mode:state.mode,
  path:state.path,
  size:state.size,
})

const mapDispatchToProps = {
  centerListSpot: centerListSpot,
  clickListSpot:clickListSpot,
  addSpot: addSpot,
  deleteSpot: deleteSpot,
  addSpotForMRs:addSpotForMRs,
  deleteSpotForMRs:deleteSpotForMRs
}



export default connect( mapStateToProps,mapDispatchToProps )(PolylineContainer );

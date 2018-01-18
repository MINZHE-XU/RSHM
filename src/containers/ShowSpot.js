import React from 'react'
import  Component from 'react'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import SpotList from '../components/SpotList'
import { clickListSpot,centerListSpot,deleteSpot } from '../actions'



const mapStateToProps = (state) => ({
  spots:state.spots,
  statusPoint:state.statusPoint
})

 const mapDispatchToProps = {
   centerListSpot: centerListSpot,
   clickListSpot: clickListSpot,
   deleteSpot:deleteSpot
 }

export default connect( mapStateToProps,mapDispatchToProps )(SpotList);

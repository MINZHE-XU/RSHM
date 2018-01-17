import React from 'react'
import  Component from 'react'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import SpotList from '../components/SpotList'
import { clickListSpot } from '../actions'



const mapStateToProps = (state) => ({
  spots:state.spots,
  center:state.center
})

 const mapDispatchToProps = {
   clickListSpot: clickListSpot
 }

export default connect( mapStateToProps,mapDispatchToProps )(SpotList);

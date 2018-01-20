import React from 'react'
import  Component from 'react'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import { addSpot } from '../actions'
import { clickListSpot,centerListSpot,deleteSpot,deleteAllSpot } from '../actions'

class AddSpot extends React.Component {
  constructor() {
    super();
    this.state = {
      message:''
    }
  }
  render() {
    return (
      <div>
        <label>
          Add point:
        </label>
        <input type='text' placeholder={(this.props.statusPoint.clicked.id===-1)?"type latitude here":this.props.statusPoint.clicked.lat} ref='latInput' />
        <input type='text' placeholder={(this.props.statusPoint.clicked.id===-1)?"type longtitude here":this.props.statusPoint.clicked.lng} ref='lngInput' />
        <button onClick={(e) => this.handleClick(e)}>
          Add
        </button>
        {this.state.message}
        <button onClick={(e) => this.handleDelete(e)}>
          DeleteSelectedSpot
        </button>
        <button onClick={(e) => this.handleDeleteAll(e)}>
          DeleteAll
        </button>
<br />

      </div>
    )
  }

  handleClick(e) {

    const latValue= (this.refs.latInput.value.trim()==="") ? parseFloat(this.refs.latInput.placeholder):parseFloat(this.refs.latInput.value.trim())
    const lngValue= (this.refs.lngInput.value.trim()==="") ? parseFloat(this.refs.lngInput.placeholder):parseFloat(this.refs.lngInput.value.trim())
    if(-90<=latValue &&latValue<=90 && -180<=lngValue && lngValue<=180){
      const r=this.props.addSpot({lat:latValue,lng:lngValue})
      this.props.clickListSpot (r)
      this.props.centerListSpot (r)
      this.setState({ message:"added"})
    }else{
      this.setState({ message:"invalid value"})
    }

    //this.props.addSpot({lat,lng});

  }
  handleChange(e) {
    this.props.changeMode();
  }
  handleDelete(e) {
    const r=this.props.deleteSpot(this.props.statusPoint.clicked)
    this.props.clickListSpot ({id:-1 , lat:10000, lng:10000})
    this.props.centerListSpot ({id:-1 , lat:10000, lng:10000})
  }
  handleDeleteAll(e) {
    const r=this.props.deleteAllSpot()
    this.props.clickListSpot ({id:-1 , lat:10000, lng:10000})
    this.props.centerListSpot ({id:-1 , lat:10000, lng:10000})
  }
}
const mapStateToProps = (state) => ({
  statusPoint:state.statusPoint
})
const mapDispatchToProps = {
  deleteSpot: deleteSpot,
  deleteAllSpot: deleteAllSpot,
  clickListSpot: clickListSpot,
  centerListSpot: centerListSpot,
  addSpot: addSpot
}
export default connect( mapStateToProps,mapDispatchToProps)(AddSpot);

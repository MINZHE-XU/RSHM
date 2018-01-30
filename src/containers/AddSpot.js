import React from 'react'
import  Component from 'react'
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import { addSpot, addSpotForMRs, deleteSpotForMRs,resetMRs } from '../actions'
import { clickListSpot,centerListSpot,deleteSpot,deleteAllSpot,updateMRs,deletePath,deleteAllPath } from '../actions'

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
        <input type='text' placeholder={(this.props.statusPoint.clicked.lat===10000)?"type latitude here":this.props.statusPoint.clicked.lat} ref='latInput' />
        <input type='text' placeholder={(this.props.statusPoint.clicked.lng===10000)?"type longtitude here":this.props.statusPoint.clicked.lng} ref='lngInput' />
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
      let temp=this.props.spots;

      const r=this.props.addSpot({id:-1,lat:latValue,lng:lngValue,isDynamic:false})
      if(this.props.mode.algorithm==='local'){
        this.props.addSpotForMRs ({spots:{lat:latValue, lng:lngValue}, size:this.props.size})
      }else{
        this.props.updateMRs({ size:this.props.size});
      }
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
    this.props.deletePath(this.props.statusPoint.clicked)

    if(this.props.mode.algorithm==='local'){
      this.props.deleteSpotForMRs({spots:this.props.statusPoint.clicked, size:this.props.size})
    }else{
      this.props.updateMRs({ size:this.props.size});
    }
    this.props.clickListSpot ({id:-1 , lat:10000, lng:10000})
    this.props.centerListSpot ({id:-1 , lat:10000, lng:10000})
  }
  handleDeleteAll(e) {
    const r=this.props.deleteAllSpot()
    this.props.deleteAllPath()
    this.props.resetMRs()
    this.props.clickListSpot ({id:-1 , lat:10000, lng:10000})
    this.props.centerListSpot ({id:-1 , lat:10000, lng:10000})
  }
}
const mapStateToProps = (state) => ({
  statusPoint:state.statusPoint,
  size:state.size,
  mode:state.mode,
  spots:state.spots
})
const mapDispatchToProps = {
  addSpot: addSpot,
  deleteSpot: deleteSpot,
  resetMRs:resetMRs,
  addSpotForMRs: addSpotForMRs,
  updateMRs: updateMRs,
  deleteSpotForMRs: deleteSpotForMRs,
  deleteAllSpot: deleteAllSpot,
  clickListSpot: clickListSpot,
  centerListSpot: centerListSpot,
  deletePath:deletePath,
  deleteAllPath:deleteAllPath

}
export default connect( mapStateToProps,mapDispatchToProps)(AddSpot);

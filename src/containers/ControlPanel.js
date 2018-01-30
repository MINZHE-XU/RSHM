import React from 'react'

import  Component from 'react'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import {changeShowMode,changeAlgorithmMode,updateMRs,deleteAllSpot,resetMRs,addSpotForMRs,moveOneStep } from '../actions'


class ControlPanel extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }
  render() {
    return (
      <div>
        <button onClick={(e) => this.handleChangeShowMode(e)}>
          change show mode
        </button>
        <button onClick={(e) => this.handleChangeAlgorithmMode(e)}>
          change algorithm mode
        </button>
        now:{this.props.mode.algorithm}
        <button onClick={(e) => this.handleUpdate(e)}>
          updateMRs
        </button>
        <button onClick={() => this.handleMoveOneStep()}>
          move one step
        </button>
        <button
        onMouseDown={(e) => this.handleOnPressIn(e)}
        onMouseUp={(e) => this.handleOnPressOut(e)}>
          keep moving
        </button>

      </div>
    )
  }
  handleChangeShowMode(e) {
    this.props.changeShowMode();
  }
  handleChangeAlgorithmMode(e) {
    this.props.changeAlgorithmMode()
    //this.props.deleteAllSpot()
    this.props.resetMRs()
    if (this.props.mode.algorithm==="full"){
      if (this.props.spots.length>0){
        for(let i=0;i<this.props.spots.length;i++){
          this.props.addSpotForMRs ({spots:this.props.spots[i], size:this.props.size})
        }
      }
    }else{
      this.props.updateMRs({spots:this.props.spots, size:this.props.size});
    }
  }

  handleUpdate(e) {

    this.props.updateMRs({spots:this.props.spots, size:this.props.size} );
  }

  handleMoveOneStep() {
    console.log("??????")
      console.log(this.props.moveOneStep({size:this.props.size}))
          console.log("0..........")


  }

  handleOnPressIn(e) {
    this.interval = setInterval(() =>{ this.handleMoveOneStep() }, 100);
  }
  handleOnPressOut(e) {
    clearInterval(this.interval);
  }

}



const mapStateToProps = (state) => ({
    spots:state.spots,
    size:state.size,
    mode:state.mode

})
const mapDispatchToProps = {
  changeShowMode: changeShowMode,
  addSpotForMRs:addSpotForMRs,
  updateMRs: updateMRs,
  changeAlgorithmMode: changeAlgorithmMode,
  deleteAllSpot:deleteAllSpot,
  resetMRs:resetMRs,
  updateMRs: updateMRs,
  moveOneStep:moveOneStep
}
export default connect( mapStateToProps,mapDispatchToProps)(ControlPanel);

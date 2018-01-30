import React from 'react'

import  Component from 'react'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import {changeShowMode,changeAlgorithmMode,updateMRs,deleteAllSpot,resetMRs,addSpotForMRs,moveOneStep,changeSize } from '../actions'


class ControlPanel extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }
  render() {
    return (
      <div>
      <label>
        Set size:
      </label>
      <input type='text' placeholder={this.props.size.length} ref='lengthInput' />
      <input type='text' placeholder={this.props.size.height} ref='heightInput' />
      <button onClick={(e) => this.handleChangeSize(e)}>
        ChangeSize
      </button>
      {this.state.messageSize}
      <br />
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
    if (this.props.mode.algorithm==="full"){
      this.recomputeMRs("local",this.props.size)
    }else{
      this.recomputeMRs("full",this.props.size)
    }

    this.props.changeAlgorithmMode()
  }

  recomputeMRs(mode,size){
    this.props.resetMRs()
    console.log(mode)
    console.log(mode==="local")
    if (mode==="local"){
      if (this.props.spots.length>0){
        for(let i=0;i<this.props.spots.length;i++){
          this.props.addSpotForMRs ({spots:this.props.spots[i], size:size})
        }
      }
    }else{
      this.props.updateMRs({spots:this.props.spots, size:size});
    }
  }

  handleUpdate(e) {
    this.props.updateMRs({spots:this.props.spots, size:this.props.size} );
  }

  handleMoveOneStep() {
      console.log(this.props.moveOneStep({size:this.props.size}))
  }

  handleOnPressIn(e) {
    this.interval = setInterval(() =>{ this.handleMoveOneStep() }, 100);
  }
  handleOnPressOut(e) {
    clearInterval(this.interval);
  }

  handleChangeSize(e) {
    const lengthValue= (this.refs.lengthInput.value.trim()==="") ? parseFloat(this.refs.lengthInput.placeholder):parseFloat(this.refs.lengthInput.value.trim())
    const heightValue= (this.refs.heightInput.value.trim()==="") ? parseFloat(this.refs.heightInput.placeholder):parseFloat(this.refs.heightInput.value.trim())
    if(0<lengthValue && lengthValue<=360 && 0<heightValue && heightValue<=180 ){
      const r=this.props.changeSize({length:lengthValue,height:heightValue})
      this.recomputeMRs(this.props.mode.algorithm,{length:lengthValue,height:heightValue})


      this.setState({ messageSize:"changed"})
    }else{
      this.setState({ messageSize:"invalid value"})
    }
    //this.props.addSpot({lat,lng});
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
  moveOneStep:moveOneStep,
  changeSize: changeSize
}
export default connect( mapStateToProps,mapDispatchToProps)(ControlPanel);

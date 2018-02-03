import React from 'react'

import  Component from 'react'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import {changeShowMode,changeAlgorithmMode,updateMRs,deleteAllSpot,resetMRs,addSpotForMRs,moveOneStep,changeSize,changeDynamicType  } from '../actions'

import { ButtonToolbar, ToggleButtonGroup,ToggleButton,Image,Panel } from 'react-bootstrap';
import {Grid, Row, Col, Clearfix,ListGroup,ListGroupItem,Table,Form,FormGroup,ControlLabel,FormControl,Button } from 'react-bootstrap';
//&nbsp;
class ControlPanel extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }
  render() {
    return (

      <ListGroup>
          <ListGroupItem>
              <Row >
                <Col componentClass={ControlLabel} xs={5} sm={5} md={5}>
                      <label>Draw Path For</label>
                  </Col>
                <Col xs={7} sm={7} md={7}>
                      <ButtonToolbar >
                        <ToggleButtonGroup bsSize="small" type="radio" name="path-options" defaultValue={1} onChange={(e) => this.handleChangeDynamicType(e)}>
                          <ToggleButton  value={1} ><Image className="data-point-image" alt="10x10" src="http://maps.google.com/mapfiles/kml/paddle/wht-diamond-lv.png" rounded /> Point</ToggleButton>
                          <ToggleButton value={2} ><Image className="drone-image" alt="10x10" src="http://maps.google.com/mapfiles/kml/shapes/heliport.png" rounded /> Drone</ToggleButton>
                        </ToggleButtonGroup>
                        </ButtonToolbar>
                  </Col>
              </Row >
        </ListGroupItem>
        <ListGroupItem>
            <Row >
                <Col componentClass={ControlLabel} xs={5} sm={5} md={5}>
                    <label>Algorithm</label>
                </Col>
                <Col xs={7} sm={7} md={7}>
                    <ButtonToolbar >
                      <ToggleButtonGroup bsSize="small" type="radio" name="algorithm-options" defaultValue={1} onChange={(e) => this.handleChangeAlgorithmMode(e)}>
                        <ToggleButton value={1}>  Local </ToggleButton>
                        <ToggleButton value={2}>  Full    </ToggleButton>
                      </ToggleButtonGroup>
                    </ButtonToolbar>
                </Col>
            </Row >
        </ListGroupItem>
        <ListGroupItem>
            <Row >
                <Col componentClass={ControlLabel} xs={5} sm={5} md={5}>
                    <label>Mainly Show</label>
                </Col>
                <Col xs={7} sm={7} md={7}>
                    <ButtonToolbar >
                      <ToggleButtonGroup bsSize="small" type="radio" name="show-options" defaultValue={1} onChange={(e) => this.handleChangeShowMode(e)}>
                        <ToggleButton value={1}>  Points </ToggleButton>
                        <ToggleButton value={2}>  Rectangles      </ToggleButton>
                      </ToggleButtonGroup>
                    </ButtonToolbar>
                </Col>
            </Row >
        </ListGroupItem>
        <ListGroupItem>
            <Row >
                <Col componentClass={ControlLabel} xs={5} sm={5} md={5}>
                    <label>Start Simulation</label>
                </Col>
                <Col xs={7} sm={7} md={7}>
                    <ButtonToolbar >
                      <ToggleButtonGroup bsSize="small" type="radio" name="algorithm-options" defaultValue={1} >
                        <ToggleButton value={1}
                        onMouseDown={(e) => this.handleOnPressIn(e,1)}
                        onMouseUp={(e) => this.handleOnPressOut(e,1)}>
                          >
                        </ToggleButton>
                        <ToggleButton value={2}
                        onMouseDown={(e) => this.handleOnPressIn(e,4)}
                        onMouseUp={(e) => this.handleOnPressOut(e,4)}>
                          >>
                        </ToggleButton>
                        <ToggleButton value={3}
                        onMouseDown={(e) => this.handleOnPressIn(e,12)}
                        onMouseUp={(e) => this.handleOnPressOut(e,12)}>
                          >>>
                        </ToggleButton>
                      </ToggleButtonGroup>
                      </ButtonToolbar>
                </Col>
            </Row >
        </ListGroupItem>

        <ListGroupItem>
        <Row >
            <Col componentClass={ControlLabel} xs={4} sm={4} md={4}>
              &nbsp;&nbsp;&nbsp;&nbsp;Width
            </Col>
            <Col xs={7} sm={7} md={7}>
              <FormControl bsSize="small" type='text' placeholder={this.props.size.length} inputRef={(input) => this.lengthInput = input} onKeyPress={(e) =>{if (e.key === 'Enter'){this.handleChangeSize() }} }  />
            </Col>
        </Row >
        <Row >
            <Col componentClass={ControlLabel} xs={4} sm={4} md={4}>
              &nbsp;&nbsp;&nbsp;&nbsp;Height
            </Col>
            <Col xs={7} sm={7} md={7}>
              <FormControl bsSize="small" type='text' placeholder={this.props.size.height}  inputRef={(input) => this.heightInput = input} onKeyPress={(e) =>{if (e.key === 'Enter'){this.handleChangeSize() }}}/>
            </Col>
        </Row >
        <Row >
            <Col componentClass={ControlLabel} xs={4} sm={4} md={4}>
              &nbsp;&nbsp;&nbsp;&nbsp;
            </Col>
            <Col xs={4} sm={4} md={4}>
                <Button bsSize="small" type="submit"  onClick={() => this.handleChangeSize()}>
                  Set Range Size
                </Button>
            </Col>
            <Col xs={4} sm={4} md={4}>
                {this.state.messageSize}
            </Col>
        </Row >

        </ListGroupItem>
      </ListGroup>



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

  handleChangeDynamicType(){
    this.props.changeDynamicType()
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


  handleMoveOneStep(stepLengthNumber) {
      console.log(this.props.moveOneStep({size:this.props.size, stepLengthNumber:stepLengthNumber}))
  }


  handleOnPressIn(e,stepLengthNumber) {
    console.log(e)
    this.interval = setInterval(() =>{ this.handleMoveOneStep(stepLengthNumber) }, 100);
  }
  handleOnPressOut(e) {
    clearInterval(this.interval);
  }



  handleChangeSize() {

    const lengthValue= (this.lengthInput.value.trim()==="") ? parseFloat(this.lengthInput.placeholder):parseFloat(this.lengthInput.value.trim())
    const heightValue= (this.heightInput.value.trim()==="") ? parseFloat(this.heightInput.placeholder):parseFloat(this.heightInput.value.trim())

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
  changeSize: changeSize,
    changeDynamicType:changeDynamicType
}
export default connect( mapStateToProps,mapDispatchToProps)(ControlPanel);

/**
<label>
  Set size:
</label>
<input type='text' placeholder={this.props.size.length} ref='lengthInput' onKeyPress={(e) =>{if (e.key === 'Enter'){this.handleChangeSize() }} }/>
<input type='text' placeholder={this.props.size.height} ref='heightInput' onKeyPress={(e) =>{if (e.key === 'Enter'){this.handleChangeSize() }}}/>
<button onClick={() => this.handleChangeSize()}>
  ChangeSize
</button>
<button onClick={(e) => this.handleChangeDynamicType(e)}>
  change dynamic type
</button>
now:{this.props.mode.dynamic}
<button onClick={(e) => this.handleChangeShowMode(e)}>
  change show mode
</button>
<button onClick={(e) => this.handleChangeAlgorithmMode(e)}>
  change algorithm mode
</button>
now:{this.props.mode.algorithm}

<button onClick={() => this.handleMoveOneStep()}>
  move one step
</button>
<button
onMouseDown={(e) => this.handleOnPressIn(e)}
onMouseUp={(e) => this.handleOnPressOut(e)}>
  keep moving
</button>
  <br />
  **/

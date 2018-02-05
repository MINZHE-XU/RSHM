/* global google */
/* eslint-disable no-undef */

import React from 'react'
import  Component from 'react'
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import { addSpot, addSpotForMRs, deleteSpotForMRs,resetMRs,deleteDrone } from '../actions'
import { clickListSpot,centerListSpot,deleteSpot,deleteAllSpot,updateMRs,deletePath,deleteAllPath,undateCandidateSpot,deleteCandidateSpot,deleteAllDrone ,addOnePath,changeDynamicType} from '../actions'
import {Panel,Grid, Row, Col, Clearfix,ListGroup,ListGroupItem,Table,Form,FormGroup,ControlLabel,FormControl,Button,Navbar,MenuItem,NavDropdown,Nav,NavItem,ButtonToolbar,ToggleButtonGroup,ToggleButton,Image } from 'react-bootstrap';

class AddSpot extends React.Component {
  constructor() {
    super();
    this.state = {
      message:'',
      data: null
    }
    this.handleFileSelect = this.handleFileSelect.bind(this);
  }
  dataLoader(content) {

      try
    {
    //this.setState({data: content});
    const loadedJson = JSON.parse(content);
    console.log(loadedJson)

    let spots=[]
    spots=loadedJson.datapoints.map((datapoint,index) =>{
      if(-90<=datapoint.lat &&datapoint.lat<=90 && -180<=datapoint.lng && datapoint.lng<=180){
        return datapoint
      }else{
        throw "Please check latitude and longitude value"
      } })

    let paths=[]
    paths=loadedJson.paths.map((singlePath,index) =>{
      let route=[]
      route= singlePath.path.map((position,index) =>{
        if(-90<=position.lat &&position.lat<=90 && -180<=position.lng && position.lng<=180){
          return new google.maps.LatLng(position.lat, position.lng)
        }else{
          throw "Please check latitude and longitude value"
        }
      })
      return {isDrone:singlePath.isDrone === true,path: route }
    })

    spots.map((spot) =>{ this.handleAdd(spot.lat,spot.lng) })
    paths.map((path) =>{ this.props.addOnePath( {path:path.path ,isDrone:path.isDrone}) })


    }
    catch(err)
    {
      let txt="Error While loading the data file.\n\n";
      txt+= err + "\n\n";
      txt+="Click OK to continue.\n\n";
      alert(txt);
    }
  }

  handleFileSelect(evt) {
    let files = evt.target.files;
    if (!files.length) {
      //alert('No file select');
      return;
    }
    let file = files[0];
    let that = this;
    let reader = new FileReader();
    reader.onload = function(e) {
      that.dataLoader(e.target.result);
    };
    reader.readAsText(file);
  }

  render() {
    const data = this.state.data;
    return (


      <Panel >
      <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">RSHM</a>
            </Navbar.Brand>
          </Navbar.Header>

            <Nav>
              <NavDropdown eventKey={1} title="File" id="basic-nav-dropdown">
                <MenuItem eventKey={1.1}>Read Local File</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={1.2}>Upload To Server</MenuItem>
                <MenuItem eventKey={1.3}>Download From Server</MenuItem>
              </NavDropdown>
              <NavItem eventKey={2} href="#">Tips</NavItem>
            </Nav>

        </Navbar>

        <Row >
          <Col componentClass={ControlLabel} xs={5} sm={5} md={5}>
                <label>&nbsp;&nbsp;Map Draw For</label>
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

        <br />
        <Row >
            <Col componentClass={ControlLabel} xs={4} sm={4} md={4}>
              &nbsp;&nbsp;X-Coordinate
            </Col>
            <Col xs={7} sm={7} md={7}>
              <FormControl bsSize="small" type='text' placeholder={(this.props.statusPoint.clicked.lat===10000)?"type latitude here":this.props.statusPoint.clicked.lat} inputRef={(input) => this.latInput = input} onKeyPress={(e) =>{if (e.key === 'Enter'){this.handleClick(e)}} }  />
            </Col>
        </Row >
        <Row >
            <Col componentClass={ControlLabel} xs={4} sm={4} md={4}>
              &nbsp;&nbsp;Y-Coordinate
            </Col>
            <Col xs={7} sm={7} md={7}>
            <FormControl bsSize="small" type='text' placeholder={(this.props.statusPoint.clicked.lng===10000)?"type longtitude here":this.props.statusPoint.clicked.lng} inputRef={(input) => this.lngInput = input} onKeyPress={(e) =>{if (e.key === 'Enter'){this.handleClick(e)}} }  />
            </Col>
        </Row >
        <Col xs={4} sm={4} md={4}>
        </Col>&nbsp;&nbsp;&nbsp;{this.state.message}<br />
        <Row >
            <Col xshidden sm={2} md={2}>
            </Col>
            <Col xs={4} sm={4} md={4}>
                <Button bsSize="small" type="submit"  onClick={(e) => this.handleClick(e)}>
                  &nbsp;&nbsp;Add Selected&nbsp;&nbsp;
                </Button>
                <Button bsSize="small" type="submit"  onClick={(e) => this.handleAddAll(e)}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Add All&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Button>
            </Col>
            <Col xs={4} sm={4} md={4}>
                <Button bsSize="small" type="submit"  onClick={(e) => this.handleDelete(e)}>
                  Delete Selected
                </Button>
                <Button bsSize="small" type="submit"  onClick={(e) => this.handleDeleteAll(e)}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Delete All&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Button>

            </Col>

        </Row >
        <br />


      </Panel>


    )
  }

  handleClick(e) {
    const latValue= (this.latInput.value.trim()==="") ? parseFloat(this.latInput.placeholder):parseFloat(this.latInput.value.trim())
    const lngValue= (this.lngInput.value.trim()==="") ? parseFloat(this.lngInput.placeholder):parseFloat(this.lngInput.value.trim())
    this.handleAdd(latValue,lngValue)
    this.props.deleteCandidateSpot({lat:latValue,lng:lngValue})

  }
  handleAddAll(e){
    this.props.statusPoint.candidateSpots.map((spot,index) =>{ this.handleAdd(spot.lat,spot.lng) })
      this.props.undateCandidateSpot([])
      this.setState({ message:"added"})
  }

  handleAdd(latValue,lngValue){
    if(-90<=latValue &&latValue<=90 && -180<=lngValue && lngValue<=180){
      let temp=this.props.spots;
      const r=this.props.addSpot({id:-1,lat:latValue,lng:lngValue,isDynamic:false})
      console.log(r)
      console.log("aa:"+this.props.spots)
      if(this.props.mode.algorithm==='local'){
        this.props.addSpotForMRs ({spots:{lat:latValue, lng:lngValue}, size:this.props.size})
      }else{
        this.props.updateMRs({ size:this.props.size});
      }
      //this.props.clickListSpot ({...r, kind:"point"})
      this.props.centerListSpot ({...r, kind:"point"})
      this.setState({ message:"added"})
    }else{
      this.setState({ message:"invalid value"})
    }
  }

  handleChangeDynamicType(){
    this.props.changeDynamicType()
  }

  handleChange(e) {
    this.props.changeMode();
  }

  handleDelete(e) {
    if (this.props.statusPoint.clicked.kind==="point"){
      const r=this.props.deleteSpot(this.props.statusPoint.clicked)
      this.props.deletePath(this.props.statusPoint.clicked)

      if(this.props.mode.algorithm==='local' ){
        this.props.deleteSpotForMRs({spots:this.props.statusPoint.clicked, size:this.props.size})
      }else{
        this.props.updateMRs({ size:this.props.size});
      }
      this.props.clickListSpot ({id:-1 , lat:10000, lng:10000 , kind:"unknown"})
      this.props.centerListSpot ({id:-1 , lat:10000, lng:10000, kind:"unknown"})
    }
    if(this.props.statusPoint.clicked.kind==="drone"){
      this.props.deleteDrone(this.props.statusPoint.clicked)
      this.props.deletePath(this.props.statusPoint.clicked)
    }
this.setState({ message:"deleted"})
  }
  handleDeleteAll(e) {
    const r=this.props.deleteAllSpot()
    this.props.deleteAllDrone()
    this.props.deleteAllPath()
    this.props.undateCandidateSpot([])
    this.props.resetMRs()
    this.props.clickListSpot ({id:-1 , lat:10000, lng:10000, kind:"unknown"})
    this.props.centerListSpot ({id:-1 , lat:10000, lng:10000, kind:"unknown"})
    this.setState({ message:"deleted"})
  }
}
const mapStateToProps = (state) => ({
  statusPoint:state.statusPoint,
  size:state.size,
  mode:state.mode,
  spots:state.spots
})
const mapDispatchToProps = {
  addOnePath:addOnePath,
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
  deleteAllPath:deleteAllPath,
  undateCandidateSpot:undateCandidateSpot,
  deleteCandidateSpot:deleteCandidateSpot,
  deleteDrone:deleteDrone,
  deleteAllDrone:deleteAllDrone,
  changeDynamicType:changeDynamicType
}
export default connect( mapStateToProps,mapDispatchToProps)(AddSpot);


/**
<label>
  Add point:
</label>
<input type='text' placeholder={(this.props.statusPoint.clicked.lat===10000)?"type latitude here":this.props.statusPoint.clicked.lat} ref='latInput' />
<input type='text' placeholder={(this.props.statusPoint.clicked.lng===10000)?"type longtitude here":this.props.statusPoint.clicked.lng} ref='lngInput' />
<button onClick={(e) => this.handleClick(e)}>
  Add
</button>
<button onClick={(e) => this.handleAddAll(e)}>
  AddALL
</button>

<button onClick={(e) => this.handleDelete(e)}>
  DeleteSelectedSpot
</button>
<button onClick={(e) => this.handleDeleteAll(e)}>
  DeleteAll
</button>
<br />



<Navbar.Collapse>

<Navbar.Form pullLeft>
<label className="file-load-label">
    <input type="file" className="file-load"  placeholder="Customized your placeholder" onChange={this.handleFileSelect}/>
    &nbsp;&nbsp;&nbsp;&nbsp;Load File&nbsp;&nbsp;&nbsp;&nbsp;
</label>
<Button bsSize="small" type="submit">Submit</Button>
<Button  bsSize="small" type="submit"  >
  &nbsp;Upload Data&nbsp;
</Button>
</Navbar.Form>

<Nav>
<NavItem eventKey={1} href="#">Link</NavItem>
<NavItem eventKey={2} >

</NavItem>

</Nav>
</Navbar.Collapse>
**/

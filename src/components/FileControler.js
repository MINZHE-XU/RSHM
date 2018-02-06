/* global google */
/* eslint-disable no-undef */

  import React from 'react'

  import  Component from 'react'
  import {bindActionCreators} from 'redux';
  import { connect } from 'react-redux'
  import { addSpot, addSpotForMRs, deleteSpotForMRs,resetMRs,deleteDrone,downloadData } from '../actions'
  import { clickListSpot,centerListSpot,deleteSpot,deleteAllSpot,updateMRs,deletePath,deleteAllPath,undateCandidateSpot,deleteCandidateSpot,deleteAllDrone ,addOnePath,changeDynamicType,uploadData} from '../actions'

import {Panel,Grid, Row, Col, Clearfix,ListGroup,ListGroupItem,Table,Form,FormGroup,ControlLabel,FormControl,Button,Navbar,MenuItem,NavDropdown,Nav,NavItem,ButtonToolbar,ToggleButtonGroup,ToggleButton,Image } from 'react-bootstrap';

  class FlieControler extends React.Component {
    constructor() {
      super();
      this.state = {
      }
      this.handleFileSelect = this.handleFileSelect.bind(this);
    }
    render() {
      return (
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
              <Button bsSize="small" type="submit"  onClick={(e) => this.handleDownloadData(e)}>
                Download Data
              </Button>
              <Button bsSize="small" type="submit"  onClick={(e) => this.handleUploadData(e)}>
                Upload Data
              </Button>
              <label className="file-load-label">
                  <input type="file" className="file-load"  placeholder="Customized your placeholder" onChange={this.handleFileSelect}/>
                  &nbsp;&nbsp;&nbsp;&nbsp;Load File&nbsp;&nbsp;&nbsp;&nbsp;
              </label>


          </Navbar>
      )
    }

    handleUploadData(){
      console.log(JSON.stringify({datapoints:this.props.spots, paths:this.props.path}))

      this.props.uploadData(JSON.stringify({datapoints:this.props.spots, paths:this.props.path}));
    }

    handleDownloadData(){
      console.log(JSON.stringify({datapoints:this.props.spots, paths:this.props.path}))

      this.props.downloadData("5a798c126afb1f7528997545");
    }


    dataLoader(content) {
        try
      {
      //this.setState({data: content});
      const loadedJson = JSON.parse(content);
      //console.log(JSON.stringify(loadedJson))
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
      this.handleDelete()
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

    handleAdd(latValue,lngValue){
      if(-90<=latValue &&latValue<=90 && -180<=lngValue && lngValue<=180){
        let temp=this.props.spots;
        const r=this.props.addSpot({id:-1,lat:latValue,lng:lngValue,isDynamic:false})

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

    handleDelete() {
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
    spots:state.spots,
    path:state.path
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
    changeDynamicType:changeDynamicType,
    uploadData:uploadData,
    downloadData:downloadData
  }




  export default connect( mapStateToProps,mapDispatchToProps)(FlieControler);

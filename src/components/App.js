import React, { Component } from 'react';
import AddSpot from '../containers/AddSpot'
import ShowSpot from '../containers/ShowSpot'
import DemoMap from '../containers/DemoMap'
import SizeControl from '../containers/SizeControl'
import ControlPanel from '../containers/ControlPanel'
import Footer from '../containers/ShowSpot'
//import MyFancyComponent from '../containers/MapNew1'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import {Accordion,Panel ,PanelGroup,Grid, Row, Col, Clearfix } from 'react-bootstrap';

class App extends Component {
  render() {
    return (

      <Grid>
      <Row className="show-grid">
      <Col xs={12}  md={4}>

        <AddSpot />

        <ControlPanel />
        <ShowSpot />

      </Col>
      <Col xs={12}  md={8}>
        <DemoMap />
      </Col>
      </Row>



      </Grid>

    );
  }
}

export default App;

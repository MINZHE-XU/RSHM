import React, { Component } from 'react';
import AddSpot from '../containers/AddSpot'
import ShowSpot from '../containers/ShowSpot'
import DemoMap from '../containers/DemoMap'
import SizeControl from '../containers/SizeControl'
import ControlPanel from '../containers/ControlPanel'
//import MyFancyComponent from '../containers/MapNew1'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"


class App extends Component {
  render() {
    return (
      <div>
        <DemoMap />
        <AddSpot />
        <ControlPanel />
        <ShowSpot />
      </div>
    );
  }
}

export default App;

import React from 'react'
import  Component from 'react'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import {changeMode,updateMRs } from '../actions'

class ControlPanel extends React.Component {
  constructor() {
    super();
    this.state = {
    }
  }
  render() {
    return (
      <div>
        <button onClick={(e) => this.handleChangeMode(e)}>
          change show mode
        </button>

        <button onClick={(e) => this.handleUpdate(e)}>
          updateMRs
        </button>
      </div>
    )
  }
  handleChangeMode(e) {
    this.props.changeMode();
  }
  handleUpdate(e) {
    this.props.updateMRs({spots:this.props.spots, size:this.props.size} );
  }
}
const mapStateToProps = (state) => ({
    spots:state.spots,
    size:state.size

})
const mapDispatchToProps = {
  changeMode: changeMode,
  updateMRs: updateMRs
}
export default connect( mapStateToProps,mapDispatchToProps)(ControlPanel);

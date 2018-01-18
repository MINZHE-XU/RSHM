import React from 'react'
import  Component from 'react'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import { addSpot } from '../actions'
import { deleteSpot, changeMode } from '../actions'

class AddSpot extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <input type='text' ref='input' />
        <button onClick={(e) => this.handleClick(e)}>
          Add
        </button>
        <button onClick={(e) => this.handleChange(e)}>
          change mode
        </button>
        <button onClick={(e) => this.handleDelete(e)}>
          DeleteSelectedSpot
        </button>
      </div>
    )
  }

  handleClick(e) {
    const node = this.refs.input;
    const text = node.value.trim();
    const lat=-34.75966612466248;
    const lng=151.688232421875;
    this.props.addSpot({lat,lng});
    node.value = '';
  }
  handleChange(e) {
    this.props.changeMode();
  }
  handleDelete(e) {
    console.log(this.props.statusPoint.clicked);
    //this.props.deleteSpot(this.props.statusPoint.clicked);
  }
}
const mapStateToProps = (state) => ({
  statusPoint:state.statusPoint
})
const mapDispatchToProps = {
  changeMode: changeMode,
  deleteSpot: deleteSpot
}
export default connect( mapStateToProps,mapDispatchToProps)(AddSpot);

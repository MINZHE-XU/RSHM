import React from 'react'
import  Component from 'react'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import {changeMode, changeSize } from '../actions'

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
          change mode
        </button>

      </div>
    )
  }
  handleChangeMode(e) {
    this.props.changeMode();
  }
  handleChangeMode1(e) {
    this.props.changeSize({length:2,height:2});
  }
}
const mapStateToProps = (state) => ({

})
const mapDispatchToProps = {
  changeMode: changeMode,
}
export default connect( mapStateToProps,mapDispatchToProps)(ControlPanel);

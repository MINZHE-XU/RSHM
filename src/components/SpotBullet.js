import React, { Component, PropTypes } from 'react'

export default class SpotBullet extends React.Component {
  render() {
    return (
      <div>
      <li
        onMouseOver={this.props.onMouseOver}
        onMouseOut={this.props.onMouseOut}
        onClick={this.props.onClick}
        style={{
          textDecoration: (this.props.spot.id===this.props.statusPoint.center.id) ? 'underline' : 'none',
          color:(this.props.spot.id===this.props.statusPoint.clicked.id)?'red':'black'
        }}>

           {this.props.spot.lat}  , {this.props.spot.lng}
      </li>
      <button onClick={ this.props.buttomOnClick}>
        Delete
      </button>
      </div>
    )
  }
}

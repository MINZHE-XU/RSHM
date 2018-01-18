import React, { Component, PropTypes } from 'react'

export default class SpotBullet extends React.Component {
  render() {
    return (
      <li
        onMouseOver={this.props.onMouseOver}
        onMouseOut={this.props.onMouseOut}
        style={{
          textDecoration: (this.props.spot.lat===this.props.statusPoint.center.lat && this.props.spot.lng===this.props.statusPoint.center.lng) ? 'underline' : 'none'
        }}>
        {this.props.spot.lat}  , {this.props.spot.lng}
      </li>
    )
  }
}

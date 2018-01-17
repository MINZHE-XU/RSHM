import React, { Component, PropTypes } from 'react'



export default class SpotBullet extends React.Component {
  render() {
    return (
      <li
        onClick={this.props.onClick}
        style={{
          textDecoration: (this.props.spot.lat===this.props.center.lat && this.props.spot.lng===this.props.center.lng) ? 'underline' : 'none'
        }}>
        {this.props.spot.lat}  , {this.props.spot.lng}
      </li>
    )
  }
}

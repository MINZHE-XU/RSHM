import React from 'react'
import PropTypes from 'prop-types'
import SpotBullet from './SpotBullet'
//import Todo from './Todo'

export default class SpotList extends React.Component {


  render() {
    return (
      <ul>
        {this.props.spots.map((spot) =>
          <SpotBullet spot={spot}
          statusPoint={this.props.statusPoint}
          key={spot.id}
          onClick={() => this.props.clickListSpot(spot)}
          buttomOnClick={() => {this.props.clickListSpot(spot)
            this.props.deleteSpot(spot)}}
          onMouseOver={() => this.props.centerListSpot(spot)}
          onMouseOut={() => this.props.centerListSpot({id:-1,lat: 1000,lng:1000})}  />
        )}
      </ul>
    )
  }


/**
 *     {todos.map(todo =>
       <Todo
         key={todo.id}
         {...todo}
         onClick={() => this.props.onTodoClick(index)} />
       />
     )}
 */

}

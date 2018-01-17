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
          center={this.props.center}
          key={spot.id}
          onClick={() => this.props.clickListSpot(spot)} />
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

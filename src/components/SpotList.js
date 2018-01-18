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
          onMouseOver={() => this.props.centerListSpot(spot)}
          onMouseOut={() => this.props.centerListSpot({lat: '500',lng:'500'})}  />
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

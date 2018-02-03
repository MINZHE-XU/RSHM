import React from 'react'
import PropTypes from 'prop-types'
import SpotBullet from './SpotBullet'
//import Todo from './Todo'
import {Panel,Badge,ListGroup } from 'react-bootstrap';

export default class SpotList extends React.Component {
  handleClick() {
    alert('You have clicked on me');
  }


  render() {
    return (
      <Panel  defaultExpanded>

          <Panel.Body className="datapoint-panel">
          <ListGroup>
            {this.props.spots.map((spot) =>
              <SpotBullet spot={spot}
              statusPoint={this.props.statusPoint}
              key={spot.id}
              onClick={() => this.props.clickListSpot({...spot, kind:"point" })}
              buttomOnClick={() => {
                const r=this.props.deleteSpot(spot)
                this.props.deletePath(spot)
                if(this.props.mode.algorithm==='local'){
                    this.props.deleteSpotForMRs({spots:spot, size:this.props.size})
                }else{
                  this.props.updateMRs({spots:this.props.spots, size:this.props.size});
                }

                this.props.clickListSpot ({id:-1 , lat:10000, lng:10000 ,kind:"unknown"})
                this.props.centerListSpot ({id:-1 , lat:10000, lng:10000, kind:"unknown"})
              }}
              onMouseOver={() => this.props.centerListSpot({...spot, kind:"point" })}
              onMouseOut={() => this.props.centerListSpot({id:-1,lat: 100000,lng:10000,kind:"unknown"})}  />
            )}
          </ListGroup>
          </Panel.Body>

      </Panel>

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

     <Panel.Heading >
       <Panel.Title toggle>
         Data Points    <Badge pullRight={true}>{this.props.spots.length}</Badge>
       </Panel.Title>
     </Panel.Heading>
     <Panel.Collapse>



           </Panel.Collapse>
 */


}

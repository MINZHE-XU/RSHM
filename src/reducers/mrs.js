const origin=[{id:0, north:-33.03900467904444, south:-34.03900467904444,west:150.4849853515625, east:151.4849853515625,rs:1}
,{id:1, north:-33.33900467904444, south:-34.33900467904444,west:150.0849853515625, east:151.0849853515625,rs:1}]
const mrs = (state =origin, action) => {
  switch (action.type) {
    case 'FULLY_UPDATE_MRS':
      console.log(action)
      console.log(action.spots)
      console.log(action.size)

      const rectangles=pointToRectangle(action.spots, action.size)
      console.log("rectangles")
      console.log(rectangles)
      const done=sweep(rectangles)
      return rectangles
      break;

    default:
      return state
  }
}

export default mrs

export function sweep(rectangles){
  let nextTodoId = 0;
  let sweepedStore=[];
  let xs = rectangles.map(function(rectangle){
    return [rectangle.west,rectangle.east];
  });
  if (xs.length>=1){
    xs = xs.reduce(function(a, b) {
      return a.concat(b);
    });
  }
  //kick duplicated
  xs=Array.from(new Set(xs));
  // xs is each x value while sweep
  //group is each y points owned by each x
  xs.sort(function (x, y) {if (x < y) {return -1;}if (x > y) {return 1;}return 0;});
  let groups= xs.map(function(x){
    let forX= rectangles.map(function(rectangle){
      if (rectangle.west<rectangle.east){
        //common case
        if(x>=rectangle.west && x<rectangle.east){
          return [{y:rectangle.south,type:"down"},{y:rectangle.north,type:"up"}];
        }else{
          return [];
        }

      }else{
        //other case
        if(x>=rectangle.west || x<rectangle.east){
          return [{y:rectangle.south,type:"down"},{y:rectangle.north,type:"up"}];
        }else{
          return [];
        }
      }

    });
    if (forX.length >=1){
      forX = forX.reduce(function(a, b) {
        return a.concat(b);
      });
    }
    return {xValue:x, group:forX};
  })



  console.log("xs")
  console.log(xs)
  console.log("groups")
  console.log(groups)
  return sweepedStore
}


export function pointToRectangle(spots, size){
  let nextTodoId = 0
  const rectangles = spots.map(function(spot){
    let northValue=spot.lat+size.height/2
    if(northValue>90){northValue=90}
    let southValue=spot.lat-size.height/2
    if(southValue>90){southValue=-90}
    let westValue=spot.lng-size.length/2
    if(westValue<=-180){westValue=westValue+360}
    let eastValue=spot.lng+size.length/2
    if(eastValue>180){eastValue=eastValue-360}
    return {id:nextTodoId++,
      north: northValue,
      south: southValue,
      east: eastValue,
      west: westValue,
      rs:1};
  });
  return rectangles
}

const origin=[{id:0, north:-33.03900467904444, south:-34.03900467904444,west:150.4849853515625, east:151.4849853515625,rs:1 }
,{id:1, north:-33.33900467904444, south:-34.33900467904444,west:150.0849853515625, east:151.0849853515625,rs:1 }]
const origin1=[{id:0, north:90, south:-90,west:-180, east:180,rs:0}]
const mrs = (state =origin1, action) => {
  switch (action.type) {
    case 'FULLY_UPDATE_MRS':
      const rectangles=pointToRectangle(action.spots, action.size)
      const sweepedData=sweepRectangle(rectangles)
      const sweepedMRs=sweepedDataToRectangle(sweepedData,0)
      return sweepedMRs
      break;
    case 'ADD_ONE_SPOT_MRS':
      console.log(action)
      const rectangle1=pointToRectangle([action.spots], action.size)
      const rec=rectangle1[0]
      console.log(rec)
      let storedMRs=state
      if (rec.west<rec.east){
        return addOneSpotMRS( storedMRs, rec)
      }else{
        //divided into two rectangles
        const rectangleLeft={ north:rec.north , south:rec.south,west:-180, east:rec.east, rs:rec.rs}
        const rectangleRight={ north:rec.north , south:rec.south,west:rec.west, east:180, rs:rec.rs}
        return addOneSpotMRS(addOneSpotMRS( storedMRs, rectangleLeft),rectangleRight )
      }


      break;

    default:
      return state
  }
}

//cut left and right unaffected partitions first, then add rs for the overlapped partions
export function addOneSpotMRS( mrs, rec){
  let effects=searchAffectedMRs(mrs, rec)
  console.log( effects)
  let storedMRs=effects.unAffectedMRs
  storedMRs=storedMRs.concat(updateOverlappingAdd( effects.affectedMRs, rec ))
  console.log(storedMRs)
  return storedMRs
}

export function updateOverlappingAdd( mrs, rec){
  let storedMRs=[]
  let effects= updateOverappingWestEast( mrs , rec)
  storedMRs=storedMRs.concat(effects.unAffectedMRs)
  effects= updateOverappingNorthSouth(effects.affectedMRs, rec)
  storedMRs=storedMRs.concat(effects.unAffectedMRs)
  storedMRs=storedMRs.concat(effects.affectedMRs.map(function(mr){
    return {north:mr.north, south:mr.south, west:mr.west, east:mr.east, rs:mr.rs+rec.rs }
  }))
  return storedMRs
}

export function updateOverappingNorthSouth( mrs, rec){
  let toDivide=[]
  let unAffectedMRs=[]
  mrs.map(function(mr){
    if(mr.south<rec.north && rec.north<mr.north ){
      unAffectedMRs=unAffectedMRs.concat([{ north:mr.north, south:rec.north,west:mr.west, east:mr.east, rs:mr.rs}])
      toDivide=toDivide.concat([{ north:rec.north , south:mr.south,west:mr.west, east:mr.east, rs:mr.rs}])
    }else{
      toDivide=toDivide.concat([mr])
    }
    return 1
  })
  let temp = toDivide
  toDivide=[]
  temp.map(function(mr){
    if(mr.south<rec.south && rec.south<mr.north ){
      unAffectedMRs=unAffectedMRs.concat([{ north:rec.south, south:mr.south,west:mr.west, east:mr.east,rs:mr.rs}])
      toDivide=toDivide.concat([{ north:mr.north, south:rec.south,west:mr.west, east:mr.east, rs:mr.rs}])
    }else{
      toDivide=toDivide.concat([mr])
    }
    return 1
  })
  return {affectedMRs:toDivide, unAffectedMRs:unAffectedMRs }
}

export function updateOverappingWestEast( mrs , rec){
  let toDivide=[]
  let unAffectedMRs=[]
  mrs.map(function(mr){
    if(mr.west<rec.west && rec.west<mr.east ){
      unAffectedMRs=unAffectedMRs.concat([{ north:mr.north, south:mr.south,west:mr.west, east:rec.west,rs:mr.rs}])
      toDivide=toDivide.concat([{ north:mr.north, south:mr.south,west:rec.west, east:mr.east, rs:mr.rs}])
    }else{
      toDivide=toDivide.concat([mr])
    }
    return 1
  })
  let temp = toDivide
  toDivide=[]
  temp.map(function(mr){
    if(mr.west<rec.east && rec.east<mr.east ){
      unAffectedMRs=unAffectedMRs.concat([{ north:mr.north, south:mr.south,west:rec.east, east:mr.east,rs:mr.rs}])
      toDivide=toDivide.concat([{ north:mr.north, south:mr.south,west:mr.west, east:rec.east, rs:mr.rs}])
    }else{
      toDivide=toDivide.concat([mr])
    }
    return 1
  })

return {affectedMRs:toDivide, unAffectedMRs:unAffectedMRs }
}



export function searchAffectedMRsaaaaa(direction,mrs, rec){
  console.log("direction")
  console.log(direction)
  console.log("mrs")
  console.log(mrs)
  console.log("rec")
  console.log(rec)
  let longitude= 0
  if (direction==='west'){
    longitude= rec.west;
  }else{
    longitude= rec.east;
  }
  console.log("longitude")
  console.log(longitude)
  let affectedMRs=[]
  let unAffectedMRs=[]
  mrs.map(function(mr){
    if (mr.west<mr.east){
      //common case
      if(longitude>mr.west && longitude<mr.east){
        affectedMRs.concat([mr]);
      }else{
        unAffectedMRs.concat([mr]);
      }
    }else{
      //other case
      if(longitude>mr.west || longitude<mr.east){
        affectedMRs.concat([mr]);
      }else{
        unAffectedMRs.concat([mr]);
      }
    }
  });
  console.log (affectedMRs)
  console.log(unAffectedMRs)
      return {affectedMRs:affectedMRs, unAffectedMRs:unAffectedMRs };
}




export function searchAffectedMRs(mrs, rec){
  console.log("mrs")
  console.log(mrs)
  console.log("rec")
  console.log(rec)
  let affectedMRs=[]
  let unAffectedMRs=[]
  mrs.map(function(mr){
    //common case
    //!(rec.west>=mr.east || rec.east<=mr.west)
    if(!(rec.west>=mr.east || rec.east<=mr.west || rec.north<=mr.south || rec.south>=mr.north )){
      affectedMRs=affectedMRs.concat([mr]);
    }else{
      unAffectedMRs=unAffectedMRs.concat([mr]);
    }
  });
  return {affectedMRs:affectedMRs, unAffectedMRs:unAffectedMRs };
}

//fully update functions
/**
      console.log(action)
      console.log(action.spots)
      console.log(action.size)
      console.log("rectangles")
      console.log(rectangles)
      console.log("sweepedData")
      console.log(sweepedData)
      console.log("sweepedMRs")
      console.log(sweepedMRs)
      **/
export function sweepedDataToRectangle(sweepedData ,limit){
  let mrs=[];
  let nextTodoId=0;
  if (sweepedData.length===0){
    return mrs
  }else{
    for(let i=0; i<sweepedData.length;i++){
      let westValue= sweepedData[i].xValue;
      let  eastValue;
      if (i===sweepedData.length-1){
        eastValue= sweepedData[0].xValue;
      }else{
        eastValue= sweepedData[i+1].xValue;
      }

      let yGroup= getYGroup(sweepedData[i].group)
      //console.log(sweepedData[i].group)
      yGroup.map(function(ay){
        if(ay.rs>=limit){
          mrs=mrs.concat([{id:nextTodoId++,
            north: ay.northValue,
            south: ay.southValue,
            east: eastValue,
            west: westValue,
            rs:ay.rs}])
          return 1;
        }

      });


    }
    return mrs
  }
}
export function getYGroup(sweepedDataGroup){
  //sweepedDataGroup.sort(function (x, y) {if (x.y < y.y) {return -1;}if (x.y > y.y) {return 1;}return 0;});
  //xs=Array.from(new Set(xs));
  let yValues=sweepedDataGroup.map(function(sweepedDataGroup1){
    return sweepedDataGroup1.y;
  });
  //contain all the rectangle y value
  yValues=yValues.concat([-90,90]);
  yValues.sort(function (x, y) {if (x < y) {return -1;}if (x > y) {return 1;}return 0;});
  yValues=Array.from(new Set(yValues));
  //console.log(yValues)
  let tempRS=0;
  let yGroup=[];
  //become y with rs
  for (let i=0; i<yValues.length-1; i++){
    sweepedDataGroup.map(function(sweepedData){
      if(sweepedData.y>=yValues[i] && sweepedData.y<yValues[i+1]){
        switch (sweepedData.type){
          case "down":
          tempRS=tempRS+1;
          break;
          case "up":
          tempRS=tempRS-1;
          break;
          default:
        }
      }
      return 1;
    });
    yGroup= yGroup.concat(
      [{ southValue:yValues[i] ,
        northValue: yValues[i+1],
        rs: tempRS
      }]
    );
  }
  return yGroup
}



export function sweepRectangle(rectangles){
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
  //console.log("xs")
  //console.log(xs)

  return groups
}


export function pointToRectangle(spots, size){
  let nextTodoId = 0
  const rectangles = spots.map(function(spot){
    let northValue=spot.lat+size.height/2
    if(northValue>90){northValue=90}
    let southValue=spot.lat-size.height/2
    if(southValue<-90){southValue=-90}
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

export default mrs

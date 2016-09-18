


var knight = function(a, b) {

  var turnsTaken = [];

  var turns = 0;

  var moves = [
    {x:1, y:2},
    {x:2, y:1},
    {x:2, y:-1},
    {x:1, y:-2},
    {x:-1, y:-2},
    {x:-2, y:-1},
    {x:-2, y:1},
    {x:-1, y:2}
  ]

  var dest = {
    x: a,
    y: b
  }

  var start = function(d){

    var newPos = [];
    var closest = null;

    if(d.x == 0  && d.y == 0) {
      return turns
      console.log('done1', turns);
    }

    console.log('add turn');
    turns++

    for(var i = 0; i < moves.length; i++) {
      newPos.push( {x: d.x + moves[i].x, y: d.y + moves[i].y} );
    }

    for(var j = 0; j < newPos.length; j++) {

      if(closest == null || (Math.abs(0 - newPos[j].x) + Math.abs(0 - newPos[j].y) < (Math.abs(0 - closest.x) + Math.abs(0 - closest.y))) ) {
        closest = newPos[j]
      }

      if(closest.x == 0 && closest.y == 0) {
        console.log('done2', turns);
        return turns
      }else if( (Math.abs(closest.x) == 0 && Math.abs(0 - closest.y) == 2) || (Math.abs(closest.y) == 0 && Math.abs(0 - closest.x) == 2) ){
        console.log('add 2 turns');
        turns = turns+2
        return turns
      }else if(Math.abs(0 - closest.x) + Math.abs(0 - closest.y) == 2){
        console.log('add 4 turns');
        turns = turns+4
        return turns
      }

    }

    console.log('closest', closest);

    start(closest)

  }

  start(dest)

  return turns

}

console.log('end', knight(12,21));

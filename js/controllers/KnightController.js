thisApp
.controller('KnightController', [
  '$scope',
  function(
    $scope
  ){

    $scope.rows = [];
    $scope.squares = [];

    for (var i = 0; i < 15; i++) {
      $scope.rows.push(
        {id:i}
      )
      $scope.squares.push(
        {id:i}
      )
    }

    $scope.knight = function(a, b) {
      $scope.turns = 0;
      $scope.turnsTaken = [];
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
        x: parseInt(a),
        y: parseInt(b)
      }

      angular.element( document.querySelectorAll('.square')).css({'background-color': 'white'})

      $scope.turnsTaken.push(dest)

      var start = function(d){

        var newPos = [];
        var closest = null;

        if (d.x == 0  && d.y == 0) {
          return $scope.turns
        }

        // CREATE NEW POSITIONS -----------------

        for (var i = 0; i < moves.length; i++) {
          newPos.push( {x: d.x + moves[i].x, y: d.y + moves[i].y} );
        }

        // FIND CLOSEST -----------------

        for (var b = 0; b < newPos.length; b++) {
          if (closest == null || (Math.abs(0 - newPos[b].x) + Math.abs(0 - newPos[b].y) <= (Math.abs(0 - closest.x) + Math.abs(0 - closest.y))) ) {
            closest = newPos[b]
          }
        }

        // CHECK 3 STEPS AHEAD -----------------

        for (var j = 0; j < newPos.length; j++) {

          if (closest.x == 0 && closest.y == 0) {

            $scope.turns++

            return $scope.turns

          } else {
            var tempPos = []

            // CREATE NEW POSITIONS 2 -----------------

            for (var k = 0; k < moves.length; k++) {
              tempPos.push( {x: newPos[j].x + moves[k].x, y: newPos[j].y + moves[k].y} );
            }

            for (var l = 0; l < tempPos.length; l++) {

              if (tempPos[l].x == 0 && tempPos[l].y == 0) {

                $scope.turns = $scope.turns + 2
                $scope.turnsTaken.push(newPos[j])
                $scope.turnsTaken.push(tempPos[l])
                return $scope.turns

              } else {

                var tempPos2 = []

                // CREATE NEW POSITIONS 3 -----------------

                for (var n = 0; n < moves.length; n++) {
                  tempPos2.push( {x: tempPos[l].x + moves[n].x, y: tempPos[l].y + moves[n].y} );
                }

                for (var m = 0; m < tempPos2.length; m++) {

                  if (tempPos2[m].x == 0 && tempPos2[m].y == 0) {
                    $scope.turns = $scope.turns + 3
                    $scope.turnsTaken.push(newPos[j])
                    $scope.turnsTaken.push(tempPos[l])
                    $scope.turnsTaken.push(tempPos2[m])
                    return $scope.turns
                  }

                }

              }

            }

          }

        }

        $scope.turns++
        $scope.turnsTaken.push(closest)
        start(closest)

      }

      start(dest)


      for (var i = 0; i < $scope.turnsTaken.length; i++) {
        angular.element( document.querySelector('#s' + $scope.turnsTaken[i].x + '-' + $scope.turnsTaken[i].y)).css({'background-color': 'red'})
      }

      console.log('turnsTaken', $scope.turnsTaken);

      return $scope.turns

    }

    // console.log('end', $scope.knight(4,4));


  }
])

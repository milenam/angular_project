/**
    @author   Thomas Lehmann
    @file     queen.js
 */
var OCCUPIED = 1; // field is in use
var FREE     = 0; // field is not in use
var OUTPUT   = 1; // when 1 show solutions


function Queen(width) {
    this.width      = width; //8
    this.lastRow    = this.width - 1;
    this.columns    = new Array(this.width); //[0,1,2,3,4,5,6,7]
    //this.rcolumns   = new Array(this.width);


    var numberOfDiagonals = 2 * this.width - 1
    this.diagonals1 = new Array(numberOfDiagonals); //[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
    this.diagonals2 = new Array(numberOfDiagonals); //[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
    this.solutions  = new Array(); //[]


    //console.log(this.visual);

    for (var index = 0; index < numberOfDiagonals; ++index) {
        if (index < this.width) {
            this.columns[index] = -1; //[-1,-1,-1,-1,-1,-1,-1,-1]
        }
        this.diagonals1[index] = FREE; //[FREE,FREE,FREE,FREE,FREE,FREE,FREE,FREE,FREE,FREE,FREE,FREE,FREE,FREE,FREE,FREE]
        this.diagonals2[index] = FREE; //[FREE,FREE,FREE,FREE,FREE,FREE,FREE,FREE,FREE,FREE,FREE,FREE,FREE,FREE,FREE,FREE]
    }

    // starts the search with initial parameters
    this.run = function() {
        this.calculate(0);
      //console.log(this.solutions);

    }

    // searches for all possible solutions
    this.calculate = function(row) { // 1 1st loop
        for (var column=0; column < this.width; ++column) {
            //console.log(this.columns);
            // current column blocked?
            if (this.columns[column] >= 0) { // goes back to loop if 0 is taken
                continue;
            }

            // relating diagonale '\' depending on current row and column
            var ixDiag1 = row + column; // 0 + 0 = 0 // 0th loop
                                        // 1 + 1 = 2 // 1st loop
                                        // 1 + 2 = 3 // 2nd loop
                                        // 2 + 4 = 6 // 3rd loop
            if (this.diagonals1[ixDiag1] == OCCUPIED) { // FREE on 0th loop
                continue;
            }

            // relating diagonale '/' depending on current row and column
            var ixDiag2 = this.width - 1 - row + column; //8 - 1 - 0 + 0 = 7
                                                         //8 - 1 - 1 + 1 = 7
                                                         //8 - 1 - 1 + 2 = 8
                                                         //8 - 1 - 2 + 4 = 8
            if (this.diagonals2[ixDiag2] == OCCUPIED) {
                continue;
            }

            // occupying column and diagonals depending on current row and column
            this.columns[column]     = row; //[0,-1,-1,-1,-1,-1,-1,-1] 0
                                            //[0,-1,-1,-1,-1,-1,-1,-1] 1
                                            //[0,-1, 1,-1,-1,-1,-1,-1]  2
            //console.log('columns',this.columns);
            this.diagonals1[ixDiag1] = OCCUPIED;


            this.diagonals2[ixDiag2] = OCCUPIED;
            console.log('col',this.columns);
            if (row == this.lastRow) {  //0 and 7
              console.log('col',this.columns);
                this.solutions.push(this.columns.slice()); // slice without parametrs copies an array [[columns]]
                console.log('sol',this.solutions);
           } else {
                this.calculate(row + 1);
           }
            //console.log('col',this.columns);
            this.columns[column]     = -1;
            this.diagonals1[ixDiag1] = FREE;
            this.diagonals2[ixDiag2] = FREE;
        }
    }
}

function main() {
    var instance = new Queen(8);
    console.log(instance.columns)
    console.log("Queen raster (" + instance.width + "x" + instance.width + ")");
    var start = new Date().getTime();
    instance.run();
    console.log("...calculation took " + (new Date().getTime() - start) + " ms");
    console.log("...with " + instance.solutions.length + " solutions");

    if (OUTPUT == 1) {
        for (var indexA=0; indexA < instance.solutions.length; ++indexA) {

            var solution = instance.solutions[indexA];
            line = "";
            for (var indexB=0; indexB < solution.length; ++indexB) {
                line += "(" + (indexB+1) + "," + (solution[indexB]+1) + ")";
                //var tem = indexB+1;
                //instance.visual[indexB+1][solution[indexB]+1].push("Q");
                //var vis = instance.visual;
            }


            console.log(line);
          //console.log(vis);
        }
    }
}

main();

///////////////////
// https://www.youtube.com/watch?v=kX5frmc6B7c
/// https://www.youtube.com/watch?v=nLnAhcoDSXg
function EightQueens() {
  this.length = 8;
  this.board = [];
  for (var i = 0; i < 8; i++) {
    this.board[i] = [];
    for (var j = 0; j < 8; j++) {
      this.board[i][j] = 0;
   }
  }

  //console.log('this',this.board);

  this.isValid = function(row,col) {
    for (var i = 0; i < this.board.length; i++) {
      if ((this.board[row][i] == "Q") || (this.board[i][col] == "Q")) {
        return false;
      }
    }
    //if (row == 0) {
      //var reset = 0;
    //} else {
      var reset = Math.min(row,col)-1;
    //}
    console.log(reset);
    console.log(row, col);
    //if (reset != -1) {
    for (var i = row-reset, j = col-reset; i<=this.board.length && j<=this.board.length; i++, j++) {
      console.log(i);
      if (this.board[i][j] == "Q") {
        return false;
      }
    }

    for (var i = row-reset, j = col+reset; i<=this.length && j>0; i++, j--) {
      if (this.board[i][j] == "Q") {
        return false;
      }
    //}
    }

    return true;
  }

  this.placeQueen = function(row, n) {
    for (var i = 0; i < n; i++) {
      //console.log('row, i',row,i)
      if (this.isValid(row, i)) {
        this.board[row][i] = "Q";
        //console.log(this.board);
        if (row == n) {
          //console.log(this.board);
        } else {
          this.placeQueen(row+1, n);
        }
      }
    }
  }
}

var r = new EightQueens();
r.placeQueen(0, 8)
//console.log(r.board);
//console.log(r.board);
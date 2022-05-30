import {Grid} from './grid.js'

var height = 400
var width = 400

var grid_density = 3
var grid_cell_width = width/grid_density
var grid_cell_height = height/grid_density
var grid = new Grid(grid_density, grid_density, grid_cell_width, grid_cell_height, 0, 0)

var mult = 0.01

function setup(){
  rectMode(CENTER)
  createCanvas(width, height)

  background(0, 0, 0)

  // for each cell in main grid
  // create a grid inside it
  for (var row=0; row<grid.n_rows; row+=1){
    for (var col=0; col<grid.n_cols; col+=1){
      var this_cell = grid.cells[row][col]

      var this_density = 20
      var this_grid_cell_size = this_cell.width/this_density

      var this_grid = new Grid(this_density, this_density, this_grid_cell_size, this_grid_cell_size, 0, 0)
      this_cell.contents['grid'] = this_grid
    }
  }

  // for each cell in main grid
  // access the grid inside it
  // for each cell in the grid inside
  // draw a circle in the center
  for (var row=0; row<grid.n_rows; row+=1){
    for (var col=0; col<grid.n_cols; col+=1){
      var this_cell = grid.cells[row][col]

      // start the new context
      // inside each of the main grid's cell
      // move to corner because the grid starts from corner
      this_cell.move_to('corner')
      var this_grid = this_cell.contents['grid']

      for (var this_row=0; this_row<this_grid.n_rows; this_row+=1){
        for (var this_col=0; this_col<this_grid.n_cols; this_col+=1){
          var this_grid_cell = this_grid.cells[this_row][this_col]
          
          // start the new context
          // inside the cell's grid's cell
          this_grid_cell.move_to('center')
          // ellipse(0, 0, 2)
          this_grid_cell.contents['point'] = createVector(0, 0)

          this_grid_cell.move_out()
        }
      }
      this_cell.move_out()
    }
  }
}

function draw(){
  // for each cell in main grid
  // access the grid inside it
  // for each cell in the grid inside
  // draw a circle in the center
  for (var row=0; row<grid.n_rows; row+=1){
    for (var col=0; col<grid.n_cols; col+=1){
      var this_cell = grid.cells[row][col]

      // start the new context
      // inside each of the main grid's cell
      // move to corner because the grid starts from corner
      this_cell.move_to('corner')
      var this_grid = this_cell.contents['grid']

      for (var this_row=0; this_row<this_grid.n_rows; this_row+=1){
        for (var this_col=0; this_col<this_grid.n_cols; this_col+=1){
          var this_grid_cell = this_grid.cells[this_row][this_col]
          
          // start the new context
          // inside the cell's grid's cell
          this_grid_cell.move_to('center')
          var this_x = this_grid_cell.contents['point'].x
          var this_y = this_grid_cell.contents['point'].y
          ellipse(this_x, this_y, 2)
          this_grid_cell.move_out()
        }
      }
      this_cell.move_out()
    }
  }
}

window.setup = setup
window.draw = draw

import {Grid} from './grid.js'

var gif_length = 60 * 6;

var height = 400
var width = 400

var grid_density = 3
var grid_cell_width = width/(grid_density+1)
var grid_cell_height = height/(grid_density+1)
var grid = new Grid(grid_density, grid_density, grid_cell_width, grid_cell_height, grid_cell_width/2, grid_cell_height/2)

var mult = 0.03

function setup(){
  rectMode(CENTER)
  // frameRate(30)
  noStroke()

  createCanvas(width, height)

  background(0, 0, 0)

  for (var row=0; row<grid.n_rows; row+=1){
    for (var col=0; col<grid.n_cols; col+=1){
      var this_cell = grid.cells[row][col]

      var this_grid_density = 20
      var this_grid_cell_size = this_cell.width/this_grid_density

      var points = []

      this_cell.move_to('corner')
      for (var y=0; y<=this_cell.height; y+=this_grid_cell_size){
        for(var x=0; x<=this_cell.width; x+=this_grid_cell_size){
          x+=random(-this_grid_cell_size/3*2, this_grid_cell_size/3*2)
          y+=random(-this_grid_cell_size/3*2, this_grid_cell_size/3*2)
          var p = createVector(x, y)
          points.push(p)
        }
      }
      this_cell.contents['points'] = points

      this_cell.move_out()
    }
  }
}

function draw(){

  if (frameCount===1){
    capturer.start()
  }

  for (var row=0; row<grid.n_rows; row+=1){
    for (var col=0; col<grid.n_cols; col+=1){
      var this_cell = grid.cells[row][col]

      this_cell.move_to('corner')
      var points = this_cell.contents['points']
    
      for (var i=0; i<points.length; i+=1){
        // pattern is laid out across the whole picture
        // not bound to just each cell
        var noise_x = (points[i].x+col*grid_cell_width)*mult
        var noise_y = (points[i].y+row*grid_cell_height)*mult
        
        // similar pattern for each cell
        // var noise_x = (points[i].x)*mult
        // var noise_y = (points[i].y)*mult

        var angle = map(noise(noise_x, noise_y), 0, 1, 0, PI*2)
        
        var probability = random(0, 1)
        if (probability<0.4){
          points[i].add(createVector(cos(angle), sin(angle)))
        }
        else {
          points[i].sub(createVector(cos(angle), sin(angle)))
        }
        // ellipse(points[i].x, points[i].y, 2)

        var circle_origin_x = this_cell.width/2
        var circle_origin_y = this_cell.height/2
        var circle_radius = this_cell.height/3.5
        
        if (in_circle(points[i], circle_origin_x, circle_origin_x, circle_radius)) {
          var dist_to_center = dist(points[i].x, points[i].y, circle_origin_x, circle_origin_x)
          var alpha = map(dist_to_center, 0, circle_radius, 3, 10)
          fill(255, 255, 255, alpha)

          ellipse(points[i].x, points[i].y, 1)
        }
      }

      this_cell.move_out()
    }
  }

  if (frameCount < gif_length){
    capturer.capture(document.getElementById('defaultCanvas0'))
  }
  else if (frameCount === gif_length){
    capturer.stop()
    capturer.save()
  }
}

function in_circle(point, origin_x, origin_y, radius){
  var dist_to_center = dist(point.x, point.y, origin_x, origin_y)
  if (dist_to_center < radius){
    return true
  }
  else{
    return false
  }
}

window.setup = setup
window.draw = draw

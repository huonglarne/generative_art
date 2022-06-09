import * as utils from '../../utils/utils.js'
import * as grid_utils from '../../utils/grid.js'

var height = 400
var width = 400

var img
var img_file = 'assets/portrait.jpg'

var mult = 0.01
var cell_size = 2

var grid

function preload(){
  img = loadImage(img_file)
}

function setup(){
  createCanvas(width, height)

  // background(0)

  img.resize(0, height)
  image(img, 0, 0)

  var n_rows = img.height/cell_size
  var n_cols = img.width/cell_size

  grid = new grid_utils.Grid(n_rows, n_cols, cell_size, cell_size, 0, 0)

  for (var this_cell of grid.cells_generator()){
    var x = random(-this_cell.width*2/3, this_cell.width*2/3)
    var y = random(-this_cell.height*2/3, this_cell.height*2/3)
    var point = createVector(this_cell.center_x + x, this_cell.center_y + y)
    this_cell.contents['vertices'] = [point]

    var color = img.get(this_cell.center_x, this_cell.center_y)
    this_cell.contents['color'] = color

    fill(color)
    noStroke()
    circle(this_cell.center_x, this_cell.center_y, cell_size)

  }

}

function draw(){
  // image(img, 0, 0)
  for (var this_cell of grid.cells_generator()){
    var vertice_list = this_cell.contents['vertices']
    var last_point = vertice_list[vertice_list.length-1]
    
    var noise_x = (last_point.x)*mult
    var noise_y = (last_point.y)*mult

    var angle = map(noise(noise_x, noise_y), 0, 1, 0, PI*2)
    var this_point = last_point.add(createVector(cos(angle), sin(angle)))

    vertice_list.push(this_point)

    noFill()
    stroke(this_cell.contents['color'])
    line(last_point.x, last_point.y, this_point.x, this_point.y)
    strokeWeight(1)
    
  }
}

draw = utils.record_gif(draw, 180)
draw = utils.capture_canvas(draw, 'output.png')

window.preload = preload
window.setup = setup
window.draw = draw

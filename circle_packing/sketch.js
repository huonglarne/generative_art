import * as circle_packing from '../utils/circle_packing.js'
import * as utils from '../utils/utils.js'

var height = 400
var width = 400

var max_r = 15
var min_r = 4
var min_dist = -2

var circle_pack

function setup(){
  // frameRate(1)
  createCanvas(width, height)

  background(0, 0, 0)

  circle_pack = new circle_packing.CirclePack(max_r, min_r, min_dist, 75, 75, 250, 250)
}

function draw(){
  circle_pack.draw()
}

draw = utils.record_gif(draw, 60)
draw = utils.capture_canvas(draw, 'output.png')

window.setup = setup
window.draw = draw
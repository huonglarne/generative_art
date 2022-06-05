import * as circle_packing from './utils/circle_packing.js'
import * as utils from './utils/utils.js'

var pg

var height = 400
var width = 400

var max_r = 15
var min_r = 3
var min_dist = 1

var circle_pack

function setup(){
  // frameRate(1)
  createCanvas(width, height)

  background(0, 0, 0)

  circle_pack = new circle_packing.CirclePack(max_r, min_r, min_dist, 75, 75, 250, 250)
}

function draw(){
  circle_pack.draw()

  utils.save_canvas()
}

window.setup = setup
window.draw = draw

import * as utils from '../../utils/utils.js'

var height = 400
var width = 400


function setup(){
  createCanvas(width, height)
}

function draw(){
  background(0, 0, 0)
}

draw = utils.record_gif(draw, 60)
draw = utils.capture_canvas(draw, 'output.png')

window.setup = setup
window.draw = draw
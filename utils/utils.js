export function record_gif(origin_func, gif_length){
  return function (...args){
    if (frameCount===1){
      capturer.start()
    }
    
    let value = origin_func(...args)
    
    if (frameCount < gif_length){
      capturer.capture(document.getElementById('defaultCanvas0'))
    }
    else if (frameCount === gif_length){
      capturer.stop()
      capturer.save()
    }

    return value
  }
}


export function capture_canvas(origin_func, filename){
  return function (...args){
    let value = origin_func(...args)
    if (keyIsDown(ENTER)) {
      console.log(filename)
      save(filename);
    }
    return value
  }
}
import Canvas from '../../framework/canvas';
import Renderer from './renderer';

class Lesson02 {
  
  constructor() {
    this.canvas = new Canvas('glCanvas');
    this.renderer = new Renderer(this.canvas.gl);
  }

  run() {
    if (!this.renderer || !this.canvas.gl) {
      return;
    }

    this.renderer.draw();
  }

}

export default Lesson02;

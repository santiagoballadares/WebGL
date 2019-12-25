import Canvas from '../../framework/canvas';
import Renderer from './renderer';

class Lesson04 {
  
  constructor() {
    this.canvas = new Canvas('glCanvas');
    this.renderer = new Renderer(this.canvas.gl);
    this.lastTime = 0;
    this.isRunning = false;

    this.render = this.render.bind(this);
  }

  run() {
    if (!this.renderer || !this.canvas.gl) {
      return;
    }

    this.isRunning = true;

    requestAnimationFrame(this.render);
  }

  render(now) {
    if (!this.isRunning) {
      return;
    }

    now *= 0.001;  // convert to seconds
    const deltaTime = now - this.lastTime;
    this.lastTime = now;

    this.renderer.updateScene(deltaTime);
    this.renderer.draw();

    requestAnimationFrame(this.render);
  }

  stop() {
    this.isRunning = false;
  }
}

export default Lesson04;

import React, {Component} from 'react';
import Canvas from '../../../framework/canvas';
import Renderer from './renderer';

class Lesson05 extends Component {
  
  constructor(props) {
    super(props);
    this.lastTime = 0;
    this.isRunning = false;
    this.renderFrame = this.renderFrame.bind(this);
  }

  componentDidMount() {
    this.canvas = new Canvas('glCanvas');
    this.renderer = new Renderer(this.canvas.gl);
    this.run();
  }

  componentWillUnmount() {
    this.stop();
  }

  run() {
    if (!this.renderer || !this.canvas.gl) {
      return;
    }

    this.isRunning = true;

    requestAnimationFrame(this.renderFrame);
  }

  renderFrame(now) {
    if (!this.isRunning) {
      return;
    }

    now *= 0.001;  // convert to seconds
    const deltaTime = now - this.lastTime;
    this.lastTime = now;

    this.renderer.updateScene(deltaTime);
    this.renderer.draw();

    requestAnimationFrame(this.renderFrame);
  }

  stop() {
    this.isRunning = false;
  }

  render() {
    return (
      <canvas id="glCanvas" width="1024" height="768" />
    );
  }

}

export default Lesson05;

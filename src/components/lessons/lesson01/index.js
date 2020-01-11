import React, {Component} from 'react';
import Canvas from '../../../framework/canvas';
import Renderer from './renderer';

class Lesson01 extends Component {

  componentDidMount() {
    this.canvas = new Canvas('glCanvas');
    this.renderer = new Renderer(this.canvas.gl);
    this.run();
  }

  run() {
    if (!this.renderer || !this.canvas.gl) {
      return;
    }

    this.renderer.draw();
  }

  render() {
    return (
      <canvas id="glCanvas" width="1024" height="768" />
    );
  }

}

export default Lesson01;

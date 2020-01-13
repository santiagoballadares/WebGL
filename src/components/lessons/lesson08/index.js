import React, {Component} from 'react';
import {AppContext} from "../../appContext";
import Canvas from '../../../framework/canvas';
import Renderer from './renderer';

class Lesson08 extends Component {

  constructor(props) {
    super(props);
    this.lessonId = 8;
    this.lastTime = 0;
    this.isRunning = false;
    this.renderFrame = this.renderFrame.bind(this);
  }

  componentDidMount() {
    this.canvas = new Canvas('glCanvas');
    this.renderer = new Renderer(this.canvas.gl);
    this.renderer.setSettings(this.context.settings[this.lessonId]);
    this.run();
  }

  componentDidUpdate() {
    this.renderer.setSettings(this.context.settings[this.lessonId]);
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

Lesson08.contextType = AppContext;

export default Lesson08;

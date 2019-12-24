import {mat4} from '../../../lib/gl-matrix';
import GLRenderer from '../../framework/glRenderer';
import Shader from '../../framework/shader';
import Mesh from '../../framework/mesh';

import vsSource from './shaders/vertex';
import fsSource from './shaders/fragment';

// Field of view is 45 degrees
// We only want to see objects between 0.1 units and 100 units away from the camera
const FIELD_OF_VIEW = 45 * Math.PI / 180;   // in radians
const Z_NEAR = 0.1;
const Z_FAR = 100.0;

class Renderer extends GLRenderer {

  constructor(gl) {
    super(gl);

    this.shader = new Shader(gl, vsSource, fsSource);
    
    this.quad = Mesh.generateQuad(gl);
    
    // Aspect ratio (width/height) matches the display size of the canvas
    this.aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  }

  // Draw the scene
  draw() {
    this.gl.clearColor(0.5, 0.5, 0.5, 1.0);   // Clear to gray
    this.gl.clearDepth(1.0);                  // Clear everything
    this.gl.enable(this.gl.DEPTH_TEST);       // Enable depth testing
    this.gl.depthFunc(this.gl.LEQUAL);        // Near things obscure far things

    // Clear the canvas before we start drawing on it
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    
    // Set shader program for WebGL to use it when drawing
    this.setShaderProgram(this.shader.shaderProgram);

    // Create a modelView matrix that represents the model translation in the scene
    this.modelViewMatrix = mat4.create();
    mat4.translate(this.modelViewMatrix, this.modelViewMatrix, [-0.0, 0.0, -6.0]);
    
    // Create a perspective matrix that simulates the distortion of perspective in a camera
    this.projectionMatrix = mat4.create();
    mat4.perspective(this.projectionMatrix, FIELD_OF_VIEW, this.aspect, Z_NEAR, Z_FAR);

    // Set the shader uniforms
    this.updateShaderMatrices();

    // Draw the quad
    this.quad.draw();
  }

}

export default Renderer;

import {mat4} from '../../../lib/gl-matrix';
import GLRenderer from '../../../framework/glRenderer';
import Shader from '../../../framework/shader';
import Mesh from '../../../framework/mesh';
import Texture from '../../../framework/texture';

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

    // Load shader program
    this.shader = new Shader(gl, vsSource, fsSource);

    // Set shader program for WebGL to use it when drawing
    this.setShaderProgram(this.shader.shaderProgram);

    // Generate mesh model
    this.cube = Mesh.generateCube(gl, this.programInfo);
    this.cube.texture = Texture.loadTexture(gl, 'resources/textures/flame.png');

    // Aspect ratio (width/height) matches the display size of the canvas
    this.aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;

    this.cubeRotation = 0.0;
  }

  // Draw the scene
  draw() {
    this.gl.clearColor(0.5, 0.5, 0.5, 1.0);   // Clear to gray
    this.gl.clearDepth(1.0);                  // Clear everything
    this.gl.enable(this.gl.DEPTH_TEST);       // Enable depth testing
    this.gl.depthFunc(this.gl.LEQUAL);        // Near things obscure far things

    // Clear the canvas before we start drawing on it
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Create a modelView matrix that represents the model translation in the scene
    this.modelViewMatrix = mat4.create();
    mat4.translate(this.modelViewMatrix,      // destination matrix
                   this.modelViewMatrix,      // matrix to translate
                   [0.0, 0.0, -4.5]);         // amount to translate
    mat4.rotate(this.modelViewMatrix,         // destination matrix
                this.modelViewMatrix,         // matrix to rotate
                0.4,                          // amount to rotate in radians
                [1, 0, 0]);                   // axis to rotate around (x)
    mat4.rotate(this.modelViewMatrix,         // destination matrix
                this.modelViewMatrix,         // matrix to rotate
                this.cubeRotation * 0.4,      // amount to rotate in radians
                [0, 1, 0]);                   // axis to rotate around (y)
    
    // Create a perspective matrix that simulates the distortion of perspective in a camera
    this.projectionMatrix = mat4.create();
    mat4.perspective(this.projectionMatrix, FIELD_OF_VIEW, this.aspect, Z_NEAR, Z_FAR);

    // Create a normal matrix
    this.normalMatrix = mat4.create();
    mat4.invert(this.normalMatrix, this.modelViewMatrix);
    mat4.transpose(this.normalMatrix, this.normalMatrix);

    // Set the shader uniforms
    this.updateShaderMatrices();
    this.updateShaderTextures();

    // Draw the cube
    this.cube.draw();
  }

  updateScene(deltaTime) {
    this.cubeRotation += deltaTime;
  }

}

export default Renderer;

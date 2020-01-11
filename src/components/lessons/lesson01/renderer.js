import {mat4} from '../../../lib/gl-matrix';
import Shader from '../../../framework/shader';
import vsSource from './shaders/vertex';
import fsSource from './shaders/fragment';

class Renderer {

  constructor(gl) {
    this.gl = gl;

    this.shader = new Shader(this.gl, vsSource, fsSource);
    
    this.programInfo = {
      program: this.shader.shaderProgram,
      attribLocations: {
        vertexPosition: this.gl.getAttribLocation(this.shader.shaderProgram, 'aVertexPosition'),
      },
      uniformLocations: {
        projectionMatrix: this.gl.getUniformLocation(this.shader.shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: this.gl.getUniformLocation(this.shader.shaderProgram, 'uModelViewMatrix'),
      },
    };

    this.buffers = this.initBuffers(this.gl);
  }

  initBuffers(gl) {
    const positions = [
      1.0,  1.0,
      -1.0,  1.0,
      1.0, -1.0,
      -1.0, -1.0,
    ];
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    return {
      position: positionBuffer,
    };
  }
  
  // Draw the scene
  draw() {
    this.gl.clearColor(0.5, 0.5, 0.5, 1.0);   // Clear to gray
    this.gl.clearDepth(1.0);                  // Clear everything
    this.gl.enable(this.gl.DEPTH_TEST);       // Enable depth testing
    this.gl.depthFunc(this.gl.LEQUAL);        // Near things obscure far things

    // Clear the canvas before we start drawing on it
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Create a perspective matrix that simulates the distortion of perspective in a camera
    // Field of view is 45 degrees
    // Aspect ratio (width/height) matches the display size of the canvas
    // We only want to see objects between 0.1 units and 100 units away from the camera
    const fieldOfView = 45 * Math.PI / 180;   // in radians
    const aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();

    // note: glmatrix.js always has the first argument as the destination to receive the result
    mat4.perspective(projectionMatrix,
                    fieldOfView,
                    aspect,
                    zNear,
                    zFar);

    // Set the drawing position to the "identity" point, which is the center of the scene
    const modelViewMatrix = mat4.create();

    // Now move the drawing position a bit to where we want to start drawing the square
    mat4.translate(modelViewMatrix,     // destination matrix
                  modelViewMatrix,      // matrix to translate
                  [-0.0, 0.0, -6.0]);   // amount to translate

    // Tell WebGL how to pull out the positions from the position buffer into the vertexPosition attribute
    {
      const numComponents = 2;
      const type = this.gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.position);
      this.gl.vertexAttribPointer(
          this.programInfo.attribLocations.vertexPosition,
          numComponents,
          type,
          normalize,
          stride,
          offset);
      this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition);
    }

    // Tell WebGL to use our program when drawing
    this.gl.useProgram(this.programInfo.program);

    // Set the shader uniforms
    this.gl.uniformMatrix4fv(
        this.programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix);
    this.gl.uniformMatrix4fv(
        this.programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix);

    {
      const offset = 0;
      const vertexCount = 4;
      this.gl.drawArrays(this.gl.TRIANGLE_STRIP, offset, vertexCount);
    }
  }

}

export default Renderer;

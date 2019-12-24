class GLRenderer {

  constructor(gl) {
    this.gl = gl;
    this.programInfo;
  }

  setShaderProgram(shaderProgram) {
    this.programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: this.gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        vertexColor: this.gl.getAttribLocation(shaderProgram, 'aVertexColor'),
      },
      uniformLocations: {
        projectionMatrix: this.gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: this.gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      },
    };

    this.gl.useProgram(this.programInfo.program);
  }

  updateShaderMatrices() {
    if (this.programInfo) {
      this.gl.uniformMatrix4fv(
        this.programInfo.uniformLocations.modelViewMatrix,
        false,
        this.modelViewMatrix
      );
      this.gl.uniformMatrix4fv(
        this.programInfo.uniformLocations.projectionMatrix,
        false,
        this.projectionMatrix
      );
    }
  }

}

export default GLRenderer;

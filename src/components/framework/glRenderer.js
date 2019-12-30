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
        textureCoord: this.gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
      },
      uniformLocations: {
        projectionMatrix: this.gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: this.gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        uSampler: this.gl.getUniformLocation(shaderProgram, 'uSampler'),
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

  updateShaderTextures() {
    if (this.programInfo) {
      // Tell the shader we bound the texture to texture unit 0
      this.gl.uniform1i(this.programInfo.uniformLocations.uSampler, 0);
    }
  }

}

export default GLRenderer;

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
        vertexNormal: this.gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
        vertexTangent: this.gl.getAttribLocation(shaderProgram, 'aVertexTangent'),
        vertexBitangent: this.gl.getAttribLocation(shaderProgram, 'aVertexBitangent'),
      },
      uniformLocations: {
        projectionMatrix: this.gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: this.gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        normalMatrix: this.gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
        uDiffuseSampler: this.gl.getUniformLocation(shaderProgram, 'uDiffuseSampler'),
        uNormalSampler: this.gl.getUniformLocation(shaderProgram, 'uNormalSampler'),
        uHeightSampler: this.gl.getUniformLocation(shaderProgram, 'uHeightSampler'),
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
      if (this.normalMatrix) {
        this.gl.uniformMatrix4fv(
          this.programInfo.uniformLocations.normalMatrix,
          false,
          this.normalMatrix
          );
      }
    }
  }

  updateShaderTextures() {
    if (this.programInfo) {
      // Tell the shader we bound the texture to texture unit 0
      this.gl.uniform1i(this.programInfo.uniformLocations.uDiffuseSampler, 0);
      // Tell the shader we bound the normal map to texture unit 1
      this.gl.uniform1i(this.programInfo.uniformLocations.uNormalSampler, 1);
      // Tell the shader we bound the height map to texture unit 2
      this.gl.uniform1i(this.programInfo.uniformLocations.uHeightSampler, 2);
    }
  }

}

export default GLRenderer;

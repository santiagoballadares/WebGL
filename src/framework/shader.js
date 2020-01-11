class Shader {

  constructor(gl, vsSource, fsSource) {
    this.gl = gl;

    const vertexShader = this.generateShader(gl.VERTEX_SHADER, vsSource);
    const fragmentShader = this.generateShader(gl.FRAGMENT_SHADER, fsSource);
  
    this.shaderProgram = gl.createProgram();
    gl.attachShader(this.shaderProgram, vertexShader);
    gl.attachShader(this.shaderProgram, fragmentShader);
    gl.linkProgram(this.shaderProgram);
  
    if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(this.shaderProgram);
      throw 'Unable to initialize the shader program. \n\n' + info;
    }
  }

  generateShader(type, source) {
    const shader = this.gl.createShader(type);

    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      const info = this.gl.getShaderInfoLog(shader);
      this.gl.deleteShader(shader);
      throw 'Unable to compile the shader. \n\n' + info + '\n\n' + source;
    }

    return shader;
  }

}

export default Shader;

const meshBuffer = {
  VERTEX_BUFFER: 0,
	COLOR_BUFFER: 1,
}

class Mesh {

  constructor(gl) {
    this.gl = gl;
  
    this.buffers = {};

    this.arrays = gl.createVertexArray();

    this.vertices;
    this.colors;
    
    this.vertexCount = 0;
    this.type = gl.TRIANGLES;
  }

  static generateQuad(gl) {
    const mesh = new Mesh(gl);

    mesh.vertices = [
      1.0,  1.0,
      -1.0,  1.0,
      1.0, -1.0,
      -1.0, -1.0,
    ];
    mesh.colors = [
      0.0,  0.0,  1.0,  1.0,
      1.0,  0.0,  0.0,  1.0,
      1.0,  0.0,  0.0,  1.0,
      0.0,  0.0,  1.0,  1.0,
    ];
    mesh.vertexCount = 4;
    mesh.type = gl.TRIANGLE_STRIP;

    mesh.initBuffers();
    mesh.bufferData();

    return mesh;
  }

  initBuffers() {
    this.buffers = {
      position: this.buildBuffer(this.vertices),
      color: this.buildBuffer(this.colors),
    };
  }

  buildBuffer(bufferData) {
    const buffer = this.gl.createBuffer();
    
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(bufferData), this.gl.STATIC_DRAW);
    
    return buffer;
  }

  bufferData() {
    this.gl.bindVertexArray(this.arrays);

    // Tell WebGL how to pull out the positions from the position buffer into the vertexPosition attribute.
    {
      const numComponents = 2;
      const type = this.gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.position);
      this.gl.vertexAttribPointer(
        meshBuffer.VERTEX_BUFFER,
        numComponents,
        type,
        normalize,
        stride,
        offset
      );
      this.gl.enableVertexAttribArray(meshBuffer.VERTEX_BUFFER);
    }

    // Tell WebGL how to pull out the colors from the color buffer into the vertexColor attribute.
    {
      const numComponents = 4;
      const type = this.gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.color);
      this.gl.vertexAttribPointer(
        meshBuffer.COLOR_BUFFER,
        numComponents,
        type,
        normalize,
        stride,
        offset
      );
      this.gl.enableVertexAttribArray(meshBuffer.COLOR_BUFFER);
    }
  }

  draw() {
    const offset = 0;
    this.gl.bindVertexArray(this.arrays);
    this.gl.drawArrays(this.type, offset, this.vertexCount);
  }

}

export default Mesh;

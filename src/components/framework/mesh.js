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
    this.indices;
    
    this.vertexCount = 0;
    this.type = gl.TRIANGLES;
  }

  static generateQuad(gl) {
    const mesh = new Mesh(gl);

    mesh.vertices = [
      1.0,  1.0, 0.0,
      -1.0,  1.0, 0.0,
      1.0, -1.0, 0.0,
      -1.0, -1.0, 0.0,
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

  static generateCube(gl) {
    const mesh = new Mesh(gl);

    const faceColors = [
      [1.0,  1.0,  1.0,  1.0],
      [1.0,  0.0,  0.0,  1.0],
      [0.0,  1.0,  0.0,  1.0],
      [0.0,  0.0,  1.0,  1.0],
      [1.0,  1.0,  0.0,  1.0],
      [0.0,  1.0,  1.0,  1.0],
    ];

    mesh.vertices = [
      // Front face
      -1.0, -1.0,  1.0,
       1.0, -1.0,  1.0,
       1.0,  1.0,  1.0,
      -1.0,  1.0,  1.0,
  
      // Back face
      -1.0, -1.0, -1.0,
      -1.0,  1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0, -1.0, -1.0,
  
      // Top face
      -1.0,  1.0, -1.0,
      -1.0,  1.0,  1.0,
       1.0,  1.0,  1.0,
       1.0,  1.0, -1.0,
  
      // Bottom face
      -1.0, -1.0, -1.0,
       1.0, -1.0, -1.0,
       1.0, -1.0,  1.0,
      -1.0, -1.0,  1.0,
  
      // Right face
       1.0, -1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0,  1.0,  1.0,
       1.0, -1.0,  1.0,
  
      // Left face
      -1.0, -1.0, -1.0,
      -1.0, -1.0,  1.0,
      -1.0,  1.0,  1.0,
      -1.0,  1.0, -1.0,
    ];
    mesh.colors = [];
    for (let i = 0; i < faceColors.length; ++i) {
      const color = faceColors[i];
      // Repeat each color four times for the four vertices of the face
      mesh.colors = mesh.colors.concat(color, color, color, color);
    }
    mesh.indices = [
      0,  1,  2,      0,  2,  3,    // front
      4,  5,  6,      4,  6,  7,    // back
      8,  9,  10,     8,  10, 11,   // top
      12, 13, 14,     12, 14, 15,   // bottom
      16, 17, 18,     16, 18, 19,   // right
      20, 21, 22,     20, 22, 23,   // left
    ];
    mesh.vertexCount = 36;
    mesh.type = gl.TRIANGLES;

    mesh.initBuffers();
    mesh.bufferData();

    return mesh;
  }

  initBuffers() {
    this.buffers = {
      position: this.buildBuffer(this.vertices),
    };
    if (this.colors) {
      this.buffers.color = this.buildBuffer(this.colors);
    }
    if (this.indices) {
      this.buffers.indices = this.buildIndexBuffer(this.indices);
    }
  }

  buildBuffer(bufferData) {
    const buffer = this.gl.createBuffer();
    
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(bufferData), this.gl.STATIC_DRAW);
    
    return buffer;
  }

  buildIndexBuffer(bufferData) {
    const buffer = this.gl.createBuffer();
    
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(bufferData), this.gl.STATIC_DRAW);
    
    return buffer;
  }

  bufferData() {
    this.gl.bindVertexArray(this.arrays);

    // Tell WebGL how to pull out the positions from the position buffer into the vertexPosition attribute.
    {
      const numComponents = 3;
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
    if (this.buffers.color) {
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

    // Tell WebGL which indices to use to index the vertices
    if (this.buffers.indices) {
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.buffers.indices);
    }
  }

  draw() {
    this.gl.bindVertexArray(this.arrays);
    
    const offset = 0;

    if (this.buffers.indices) {
      this.gl.drawElements(this.type, this.vertexCount, this.gl.UNSIGNED_SHORT, offset);
    } else {
      this.gl.drawArrays(this.type, offset, this.vertexCount);
    }
  }

}

export default Mesh;

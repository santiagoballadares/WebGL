class Mesh {

  constructor(gl) {
    this.gl = gl;
  
    this.buffers = {};

    this.vao = gl.createVertexArray();

    this.vertices;
    this.colors;
    this.textureCoordinates;
    this.normals;
    this.indices;
    
    this.vertexCount = 0;
    this.indicesCount = 0;

    this.texture = null;

    this.type = gl.TRIANGLES;
  }

  static generateQuad(gl, programInfo) {
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
    mesh.bufferData(programInfo);

    return mesh;
  }

  static generateCube(gl, programInfo) {
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
    mesh.textureCoordinates = [
      // Front
      0.0,  0.0,
      1.0,  0.0,
      1.0,  1.0,
      0.0,  1.0,
      // Back
      0.0,  0.0,
      1.0,  0.0,
      1.0,  1.0,
      0.0,  1.0,
      // Top
      0.0,  0.0,
      1.0,  0.0,
      1.0,  1.0,
      0.0,  1.0,
      // Bottom
      0.0,  0.0,
      1.0,  0.0,
      1.0,  1.0,
      0.0,  1.0,
      // Right
      0.0,  0.0,
      1.0,  0.0,
      1.0,  1.0,
      0.0,  1.0,
      // Left
      0.0,  0.0,
      1.0,  0.0,
      1.0,  1.0,
      0.0,  1.0,
    ];
    mesh.vertexNormals = [
      // Front
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,
  
      // Back
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,
  
      // Top
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,
  
      // Bottom
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
  
      // Right
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
  
      // Left
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0
    ];
    mesh.indices = [
      0,  1,  2,      0,  2,  3,    // front
      4,  5,  6,      4,  6,  7,    // back
      8,  9,  10,     8,  10, 11,   // top
      12, 13, 14,     12, 14, 15,   // bottom
      16, 17, 18,     16, 18, 19,   // right
      20, 21, 22,     20, 22, 23,   // left
    ];
    mesh.indicesCount = 36;
    mesh.type = gl.TRIANGLES;

    mesh.initBuffers();
    mesh.bufferData(programInfo);

    return mesh;
  }

  initBuffers() {
    this.buffers.position = this.buildBuffer(this.vertices);

    if (this.colors) {
      this.buffers.color = this.buildBuffer(this.colors);
    }

    if (this.textureCoordinates) {
      this.buffers.textureCoord = this.buildBuffer(this.textureCoordinates);
    }

    if (this.vertexNormals) {
      this.buffers.normal = this.buildBuffer(this.vertexNormals);
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

  bufferData(programInfo) {
    this.gl.bindVertexArray(this.vao);

    // Tell WebGL how to pull out the positions from the position buffer into the vertexPosition attribute.
    {
      const numComponents = 3;
      const type = this.gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.position);
      this.gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset
      );
      this.gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
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
        programInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset
      );
      this.gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
    }

    // Tell WebGL how to pull out the texture coordinates from the texture coordinate buffer into the textureCoord attribute.
    if (this.buffers.textureCoord) {
      const numComponents = 2;
      const type = this.gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.textureCoord);
      this.gl.vertexAttribPointer(
        programInfo.attribLocations.textureCoord,
        numComponents,
        type,
        normalize,
        stride,
        offset
      );
      this.gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);
    }

    // Tell WebGL how to pull out the normals from the normal buffer into the vertexNormal attribute.
    if (this.buffers.normal) {
      const numComponents = 3;
      const type = this.gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.normal);
      this.gl.vertexAttribPointer(
        programInfo.attribLocations.vertexNormal,
        numComponents,
        type,
        normalize,
        stride,
        offset);
      this.gl.enableVertexAttribArray(programInfo.attribLocations.vertexNormal);
    }

    // Tell WebGL which indices to use to index the vertices
    if (this.buffers.indices) {
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.buffers.indices);
    }

    this.gl.bindVertexArray(null);
  }

  draw() {
    if (this.texture) {
      // Tell WebGL we want to affect texture unit 0
      this.gl.activeTexture(this.gl.TEXTURE0);
      // Bind the texture to texture unit 0
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    }

    this.gl.bindVertexArray(this.vao);
    
    const offset = 0;

    if (this.buffers.indices) {
      this.gl.drawElements(this.type, this.indicesCount, this.gl.UNSIGNED_SHORT, offset);
    } else {
      this.gl.drawArrays(this.type, offset, this.vertexCount);
    }

    this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    this.gl.bindVertexArray(null);
  }

}

export default Mesh;

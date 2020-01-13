class Mesh {

  constructor(gl) {
    this.gl = gl;
  
    this.buffers = {};

    this.vao = gl.createVertexArray();

    this.vertices;
    this.colors;
    this.textureCoordinates;
    this.normals;
    this.tangents;
    this.bitangents;
    this.indices;
    
    this.vertexCount = 0;
    this.indicesCount = 0;

    this.texture = null;

    this.type = gl.TRIANGLES;
  }

  static generateQuad(gl, programInfo) {
    const mesh = new Mesh(gl);

    mesh.vertices = [
       1,  1, 0,
      -1,  1, 0,
       1, -1, 0,
      -1, -1, 0,
    ];
    mesh.colors = [
      1,  0,  0,  1,
      0,  1,  0,  1,
      0,  0,  1,  1,
      1,  1,  1,  1,
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
      [1,  0,  0,  1],
      [0,  1,  0,  1],
      [0,  0,  1,  1],
      [1,  1,  0,  1],
      [0,  1,  1,  1],
      [1,  0,  1,  1],
    ];

    mesh.vertices = [
      -1, -1,  1,   1,  1,  1,  -1,  1,  1,   1, -1,  1, // Front
			-1, -1, -1,   1,  1, -1,  -1,  1, -1,   1, -1, -1, // Back
			 1, -1, -1,   1,  1,  1,   1, -1,  1,   1,  1, -1, // Right
			-1, -1, -1,  -1,  1,  1,  -1, -1,  1,  -1,  1, -1, // Left
			-1,  1, -1,   1,  1,  1,  -1,  1,  1,   1,  1, -1, // Top
			-1, -1, -1,   1, -1,  1,  -1, -1,  1,   1, -1, -1, // Bottom
    ];
    mesh.colors = [];
    for (let i = 0; i < faceColors.length; ++i) {
      const color = faceColors[i];
      // Repeat each color four times for the four vertices of the face
      mesh.colors = mesh.colors.concat(color, color, color, color);
    }
    mesh.textureCoordinates = [
       0,  1,  1,  0,  0,  0,  1,  1, // Front
			 1,  1,  0,  0,  1,  0,  0,  1, // Back
			 1,  1,  0,  0,  0,  1,  1,  0, // Right
			 0,  1,  1,  0,  1,  1,  0,  0, // Left
			 0,  0,  1,  1,  0,  1,  1,  0, // Top
			 0,  1,  1,  0,  0,  0,  1,  1, // Bottom
    ];
    mesh.normals = [
       0,  0,  1,   0,  0,  1,   0,  0,  1,   0,  0,  1, // Front
       0,  0, -1,   0,  0, -1,   0,  0, -1,   0,  0, -1, // Back
       1,  0,  0,   1,  0,  0,   1,  0,  0,   1,  0,  0, // Right
      -1,  0,  0,  -1,  0,  0,  -1,  0,  0,  -1,  0,  0, // Left
       0,  1,  0,   0,  1,  0,   0,  1,  0,   0,  1,  0, // Top
       0, -1,  0,   0, -1,  0,   0, -1,  0,   0, -1,  0, // Bottom
    ];
    mesh.tangents = [
      1,  0,  0,   1,  0,  0,   1,  0,  0,   1,  0,  0, // Front
     -1,  0,  0,  -1,  0,  0,  -1,  0,  0,  -1,  0,  0, // Back
      0,  0, -1,   0,  0, -1,   0,  0, -1,   0,  0, -1, // Right
      0,  0,  1,   0,  0,  1,   0,  0,  1,   0,  0,  1, // Left
      1,  0,  0,   1,  0,  0,   1,  0,  0,   1,  0,  0, // Top
      1,  0,  0,   1,  0,  0,   1,  0,  0,   1,  0,  0, // Bottom
    ];
    mesh.bitangents = [
      0, -1,  0,   0, -1,  0,   0, -1,  0,   0, -1,  0, // Front
      0, -1,  0,   0, -1,  0,   0, -1,  0,   0, -1,  0, // Back
      0, -1,  0,   0, -1,  0,   0, -1,  0,   0, -1,  0, // Right
      0, -1,  0,   0, -1,  0,   0, -1,  0,   0, -1,  0, // Left
      0,  0,  1,   0,  0,  1,   0,  0,  1,   0,  0,  1, // Top
      0,  0, -1,   0,  0, -1,   0,  0, -1,   0,  0, -1, // Bottom
    ];
    mesh.indices = [
       0,  1,  2,     0,  3,  1, // Front
			 4,  6,  5,     4,  5,  7, // Back
			 8,  9, 10,     8, 11,  9, // Right
			12, 14, 13,    12, 13, 15, // Left
			16, 18, 17,    16, 17, 19, // Top
			20, 21, 22,    20, 23, 21, // Bottom
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

    if (this.normals) {
      this.buffers.normal = this.buildBuffer(this.normals);
    }

    if (this.tangents) {
      this.buffers.tangent = this.buildBuffer(this.tangents);
    }

    if (this.bitangents) {
      this.buffers.bitangent = this.buildBuffer(this.bitangents);
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
    if (this.buffers.position && programInfo.attribLocations.vertexPosition !== -1) {
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
    if (this.buffers.color && programInfo.attribLocations.vertexColor !== -1) {
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
    if (this.buffers.textureCoord && programInfo.attribLocations.textureCoord !== -1) {
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
    if (this.buffers.normal && programInfo.attribLocations.vertexNormal !== -1) {
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

    // Tell WebGL how to pull out the tangents from the normal buffer into the vertexTangent attribute.
    if (this.buffers.tangent && programInfo.attribLocations.vertexTangent !== -1) {
      const numComponents = 3;
      const type = this.gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.tangent);
      this.gl.vertexAttribPointer(
        programInfo.attribLocations.vertexTangent,
        numComponents,
        type,
        normalize,
        stride,
        offset);
      this.gl.enableVertexAttribArray(programInfo.attribLocations.vertexTangent);
    }

    // Tell WebGL how to pull out the bitangents from the normal buffer into the vertexBitangent attribute.
    if (this.buffers.bitangent && programInfo.attribLocations.vertexBitangent !== -1) {
      const numComponents = 3;
      const type = this.gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.bitangent);
      this.gl.vertexAttribPointer(
        programInfo.attribLocations.vertexBitangent,
        numComponents,
        type,
        normalize,
        stride,
        offset);
      this.gl.enableVertexAttribArray(programInfo.attribLocations.vertexBitangent);
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

    if (this.normalTex) {
      // Tell WebGL we want to affect texture unit 1
      this.gl.activeTexture(this.gl.TEXTURE1);
      // Bind the texture to texture unit 1
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.normalTex);
    }

    if (this.heightTex) {
      // Tell WebGL we want to affect texture unit 2
      this.gl.activeTexture(this.gl.TEXTURE2);
      // Bind the texture to texture unit 2
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.heightTex);
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

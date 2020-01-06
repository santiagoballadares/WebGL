export default `#version 300 es

  in vec4 aVertexPosition;
  in vec4 aVertexColor;
  in vec2 aTextureCoord;
  
  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;

  out highp vec2 vTextureCoord;

  void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    vTextureCoord = aTextureCoord;
  }
`;

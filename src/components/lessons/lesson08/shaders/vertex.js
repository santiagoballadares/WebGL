export default `#version 300 es
precision highp float;

in vec4 aVertexPosition;
in vec2 aTextureCoord;
in vec3 aVertexNormal;
in vec3 aVertexTangent;
in vec3 aVertexBitangent;

uniform mat4 uModelViewMatrix;
uniform mat4 uNormalMatrix;
uniform mat4 uProjectionMatrix;

out highp vec2 vTextureCoord;
out highp vec3 vLightPos;
out highp vec3 vViewPos;
out highp vec3 vWorldPos;

void main(void) {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  vWorldPos = vec3(uModelViewMatrix * aVertexPosition);
  vec3 vertexNormal = cross(aVertexBitangent, aVertexTangent);

  vec3 t = normalize(mat3(uNormalMatrix) * aVertexTangent);
  vec3 b = normalize(mat3(uNormalMatrix) * aVertexBitangent);
  vec3 n = normalize(mat3(uNormalMatrix) * vertexNormal);
  mat3 tbn = transpose(mat3(t, b, n));
  
  vec3 lightPos = vec3(1, 1, 1);
  vLightPos = tbn * lightPos;
  vViewPos = tbn * vec3(0, 0, 0);
  vWorldPos = tbn * vWorldPos;

  vTextureCoord = aTextureCoord;
}
`;

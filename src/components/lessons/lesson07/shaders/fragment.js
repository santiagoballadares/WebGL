export default `#version 300 es
  precision highp float;
  
  in highp vec2 vTextureCoord;
  in highp vec3 vLighting;

  uniform sampler2D uDiffuseSampler;
  
  out vec4 outColor;

  void main(void) {
    highp vec4 texelColor = texture(uDiffuseSampler, vTextureCoord);
    outColor = vec4(texelColor.rgb * vLighting, texelColor.a);
  }
`;

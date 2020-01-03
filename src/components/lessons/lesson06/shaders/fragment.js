export default `#version 300 es
  precision highp float;
  
  in highp vec2 vTextureCoord;
  in highp vec3 vLighting;

  uniform sampler2D uSampler;
  
  out vec4 outColor;

  void main(void) {
    highp vec4 texelColor = texture(uSampler, vTextureCoord);
    outColor = vec4(texelColor.rgb * vLighting, texelColor.a);
  }
`;

export default `#version 300 es
precision mediump float;

in vec2 vTextureCoord;

uniform sampler2D uDiffuseSampler;

out vec4 outColor;

void main(void) {
  outColor = texture(uDiffuseSampler, vTextureCoord);
}
`;

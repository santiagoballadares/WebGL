export default `#version 300 es
precision highp float;

in highp vec2 vTextureCoord;
in highp vec3 vLightPos;
in highp vec3 vViewPos;
in highp vec3 vWorldPos;

uniform sampler2D uDiffuseSampler;
uniform sampler2D uNormalSampler;
uniform sampler2D uHeightSampler;

// Bump mapping type:
// 0 = No bump mapping
// 1 = Normal mapping
// 2 = Parallax mapping
// 3 = Steep parallax mapping
// 4 = Parallax occlusion mapping

uniform int uBumpmappingType;
uniform float uParallaxScale;
uniform float uNumberOfSteps;

out vec4 outColor;

vec2 parallaxUV(vec2 uv, vec3 viewDir) {
  if (uBumpmappingType == 2) {
    // Parallax mapping
    float height = texture(uHeightSampler, uv).r;    
    vec2 p = viewDir.xy * (height * uParallaxScale) / viewDir.z;
    return uv - p;
  } else {
    float layerHeight = 1.0 / uNumberOfSteps;
    float curLayerHeight = 0.0;
    vec2 deltaUV = viewDir.xy * uParallaxScale / (viewDir.z * uNumberOfSteps);
    vec2 curUV = uv;

    float heightFromSampler = texture(uHeightSampler, curUV).r;

    for (int i = 0; i < 32; i++) {
      curLayerHeight += layerHeight;
      curUV -= deltaUV;
      heightFromSampler = texture(uHeightSampler, curUV).r;
      if (heightFromSampler < curLayerHeight) {
        break;
      }
    }

    if (uBumpmappingType == 3) {
      // Steep parallax mapping
      return curUV;
    } else {
      // Parallax occlusion mapping
      vec2 prevUV = curUV + deltaUV;
      float next = heightFromSampler - curLayerHeight;
      float prev = texture(uHeightSampler, prevUV).r - curLayerHeight + layerHeight;
      float weight = next / (next - prev);
      return mix(curUV, prevUV, weight);
    }
  }
}

void main(void) {
  vec3 lightDir = normalize(vLightPos - vWorldPos);
  vec3 viewDir = normalize(vViewPos - vWorldPos);

  // Only perturb the texture coordinates if a parallax technique is selected
  vec2 uv = (uBumpmappingType < 2) ? vTextureCoord : parallaxUV(vTextureCoord, viewDir);

  vec3 albedo = texture(uDiffuseSampler, uv).rgb;
  vec3 ambient = 0.3 * albedo;

  if (uBumpmappingType == 0) {
      // No bump mapping
      vec3 normal = vec3(0, 0, 1);
      float diffuse = max(dot(lightDir, normal), 0.0);
      outColor = vec4(diffuse * albedo + ambient, 1.0);
  } else {
      // Normal mapping
      vec3 normal = normalize(texture(uNormalSampler, uv).rgb * 2.0 - 1.0);
      float diffuse = max(dot(lightDir, normal), 0.0);
      outColor = vec4(diffuse * albedo + ambient, 1.0);
  }
}
`;

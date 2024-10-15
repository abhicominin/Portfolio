#include <fog_pars_vertex>
varying vec2 vUv;
varying vec2 cloudUV;

varying vec3 vColor;
uniform float iTime;

void main() {
  #include <begin_vertex>
  #include <project_vertex>
  #include <fog_vertex>
  vUv = uv;
  cloudUV = uv;
  vColor = color;
  vec3 cpos = position;

  float waveSize = 14.0f;  
  float tipDistance = 0.45f;
  float centerDistance = 0.05f;

  if (color.x > 0.6f) {
    cpos.x += sin((iTime / 500.) + (uv.x * waveSize)) * tipDistance;
    //cpos.z += sin((iTime / 500.) + (uv.x * waveSize)) * tipDistance;
    cpos.y += sin((iTime / 1200.) + (uv.x * waveSize)) * tipDistance;
  }else if (color.x > 0.0f) {
    cpos.x += sin((iTime / 500.) + (uv.x * waveSize)) * centerDistance;
    //cpos.z += sin((iTime / 500.) + (uv.x * waveSize)) * centerDistance;
  }

  float diff = position.x - cpos.x;
  cloudUV.x += iTime / 100000000000000.;
  cloudUV.y += iTime / 100000000000000.;

  vec4 worldPosition = vec4(cpos, 1.);
  mvPosition = projectionMatrix * modelViewMatrix * vec4(cpos, 1.0);
  gl_Position = mvPosition;
}

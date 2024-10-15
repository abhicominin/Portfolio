varying vec2 vUv;
varying vec2 cloudUV;
varying vec3 vColor;
uniform float iTime;

varying float vVertexID;

float rand(float id) {
  return fract(sin(id) * 43758.5453123);
}

void main() {
  vUv = uv;
  cloudUV = uv;
  vColor = color;

  vVertexID = float(gl_VertexID); // Assign gl_VertexID to varying

  vec3 cpos = position;

  // Use gl_VertexID to create per-blade randomness
  float bladeID = float(gl_VertexID / 3); // Assume each blade consists of 3 vertices (triangles)

  // Generate a random value for each blade based on its ID
  float randomFactor = rand(bladeID);

  // Wave parameters
  float waveSize = 7.0;
  float tipDistance = 0.25;
  float centerDistance = 0.05;

  // Modify the blade's animation based on its random factor
  float swaySpeed = 250.0 + randomFactor * 500.0;  // Random sway speed for each blade
  float swayAmplitude = 1.5 + randomFactor * 0.2;  // Random sway amplitude for each blade

  // Time-based sway using the random factor and time
  if (color.x > 0.6) {
    cpos.x += sin((iTime / swaySpeed) + (uv.x * waveSize)) * (tipDistance * swayAmplitude);
  } else if (color.x > 0.0) {
    cpos.x += sin((iTime / swaySpeed) + (uv.x * waveSize)) * (centerDistance * swayAmplitude);
  }

  // Slight movement in UV for texture animation (cloud movement)
  cloudUV.x += iTime / 100000000000000.0;
  cloudUV.y += iTime / 100000000000000.0;

  // Calculate final vertex position
  vec4 mvPosition = projectionMatrix * modelViewMatrix * vec4(cpos, 1.0);
  gl_Position = mvPosition;
}

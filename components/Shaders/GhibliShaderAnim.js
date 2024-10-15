import { Color, Vector3 } from "three";

// Darker and original colors
// new Color("#427062"),
// new Color("#33594E"),
// new Color("#234549"),
// new Color("#1E363F"),

// Lighter colors replace in layout.js as props to see diff
// new Color("#C0EBA6"),
// new Color("#8FD14F"),
// new Color("#8FD14F"),
// new Color("#6EC207"),

export const GhibliShaderAnim = {
  uniforms: {
    colorMap: {
      value: [
        new Color("#C0EBA6"),
        new Color("#8FD14F"),
        new Color("#8FD14F"),
        new Color("#6EC207"),
      ],
    },
    brightnessThresholds: {
      value: [0.5, 0.25, 0.01, 0.01],
    },
    lightPosition: { value: new Vector3(10, 40, 30) },
    uTime: { value: 0.0 }, // Time uniform
  },
  vertexShader: /* glsl */ `
 // Set the precision for data types used in this shader
 precision highp float;
 precision highp int;

 // Variables to pass from vertex to fragment shader
 varying vec3 vNormal;
 varying vec3 vPosition;

 void main() {
   vNormal = normal;
   vPosition = position;

   gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); 
    }`,
  fragmentShader: /* glsl */ `


  precision highp float;
  precision highp int;
  
  uniform mat4 modelMatrix;
  uniform vec3 colorMap[4];
  uniform float brightnessThresholds[3];
  uniform vec3 lightPosition;
  uniform float uTime; // Adding time for animated noise
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  // Simple 2D random generator
  float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  // 2D Noise function
  float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
  
      // Four corners of the square grid cell
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
  
      // Bilinear interpolation
      vec2 u = f * f * (3.0 - 2.0 * f);
  
      return mix(a, b, u.x) + (c - a) * u.y * (b - a);
  }
  
  // Function to apply noise and alter brightness
  float applyNoise(vec3 position, float baseBrightness) {
      // Use the fragment's position and time to compute noise (creating moving patterns)
      float noiseValue = noise(position.xy * 90.0 + uTime * 0.95); // Adjust scale and time factor
  
      // Modulate the brightness using the noise value
      return baseBrightness + noiseValue * 0.1; // You can scale the noise influence here
  }

  vec3 brightnessContrast(vec3 value, float brightness, float contrast)
  {  return (value - 0.5) * contrast + 0.5 + brightness; }  

  
  void main() {
      // Calculate world space positions and lighting
      vec3 worldPosition = (modelMatrix * vec4(vPosition, 1.0)).xyz;
      vec3 worldNormal = normalize(mat3(modelMatrix) * vNormal);
      vec3 lightVector = normalize(lightPosition - worldPosition);
  
      // Calculate base brightness (angle between light and surface normal)
      float brightness = dot(worldNormal, lightVector);
  
      // Apply noise to the brightness
      brightness = applyNoise(worldPosition, brightness);
  
      // Determine final color based on brightness and thresholds
      vec4 finalColor;
      if (brightness > brightnessThresholds[0]){
          finalColor = vec4(colorMap[0], 1.0);
      }
      else if (brightness > brightnessThresholds[1]){
          finalColor = vec4(colorMap[1], 1.0);
      }
      else if (brightness > brightnessThresholds[2]){
          finalColor = vec4(colorMap[2], 1.0);
      }    
      else{
          finalColor = vec4(colorMap[3], 1.5);
      }    

          
  
      // Use the default output, 'gl_FragColor'
      gl_FragColor = finalColor; // Directly using the default output variable
  
  
    }`
}

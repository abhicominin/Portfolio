uniform sampler2D texture1;
uniform sampler2D textures[4];

varying vec2 vUv;
varying vec2 cloudUV;
varying vec3 vColor;

vec3 brightnessContrast(vec3 value, float brightness, float contrast)
 {  return (value - 0.5) * contrast + 0.5 + brightness; }  

void main() {
  float contrast = 1.2;
  float brightness = 0.003;
  vec3 color = texture2D(textures[0], vUv).rgb * contrast;
  color = color + vec3(brightness, brightness, brightness);
  color = mix(color, texture2D(textures[1], cloudUV).rgb, 0.4);
  gl_FragColor.rgb = color;
  gl_FragColor.rgb = brightnessContrast(color, 0.14,1.6);
  gl_FragColor.a = 3.;
}

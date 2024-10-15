uniform sampler2D texture1;
uniform sampler2D textures[4];
uniform float iTime;  // Time variable for animation

varying vec2 vUv;
varying vec2 cloudUV;
varying vec3 vColor;

vec3 brightnessContrast(vec3 value, float brightness, float contrast) {  
    return (value - 0.5) * contrast + 0.5 + brightness; 
}

void main() {
    float contrast = 1.2;
    float brightness = 0.003;

    // Animate the sine wave distortion over time using iTime
    vec2 distortedUv = vUv + 0.1 * sin(vUv.y * 10.0 + iTime * 0.0006 + vUv.x * 10.0);

    // Sample the first texture with animated UV distortion
    vec3 color = texture2D(textures[0], distortedUv).rgb * contrast;

    // Apply brightness adjustment
    color = color + vec3(brightness, brightness, brightness);

    // Blend with texture[1] using the cloudUV coordinates
    color = mix(color, texture2D(textures[1], cloudUV).rgb, 0.5);

    // Further brightness and contrast adjustment
    gl_FragColor.rgb = brightnessContrast(color, 0.14, 1.6);

    // Set the alpha channel
    gl_FragColor.a = 1.0;  // Use a standard alpha value
}

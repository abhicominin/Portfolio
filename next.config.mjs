/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    customKey: 'my-value',
    NUM_GRASS: '16 * 1024',
    GRASS_SEGMENTS: '6',
    GRASS_VERTICES: '( 6 + 1 ) * 2',
    GRASS_PATCH_SIZE: '1',
    GRASS_WIDTH: '0.25',
    GRASS_HEIGHT: '2',
  },
  reactStrictMode: false,
  swcMinify: true,
  webpack: (config) => {
    config.module.rules.push({
      "test": /\.(glsl|vs|fs|vert|frag)$/,
      "exclude": /node_modules/,
      "use": ["raw-loader", "glslify-loader"]
    })
    return config
  } 
};


export default nextConfig;

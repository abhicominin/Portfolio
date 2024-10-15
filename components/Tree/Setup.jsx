import React, { useMemo, useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3, Color } from 'three';
import { GhibliShaderAnim } from '../Shaders/GhibliShaderAnim';
import { ToonShader } from '../Shaders/ToonShader';

export function Setup(props) {
  const { nodes, materials } = useGLTF('/setup.glb');
  const { viewport, camera } = useThree(); // Access the camera
  const foliageref = useRef();
  const startTime = useMemo(() => Date.now(), []); // Initialize startTime

  // Toon shader uniforms
  const uniformstoon = useMemo(() => ({
    ...ToonShader.uniforms,
    uBaseColor: { value: new Color('#FFCBCB') },
    uAmbientLightColor: { value: new Color('#050505') },
    uDirLightColor: { value: new Color('white') },
    uDirLightPos: { value: new Vector3(8,5,-5) },
    uLineColor1: { value: new Color('#808080') },
    uLineColor2: { value: new Color('black') }
  }), []);

  // Ghibli shader uniforms with camera position for Fresnel effect
  const uniformsghibli = useMemo(() => ({
    uTime: { value: 0.0 }, // Time uniform for animation
    colorMap: { value: props.colors }, // Color map for shading
    brightnessThresholds: { value: [0.8, 0.1, 0.03, 0.01] }, // Brightness levels
    lightPosition: { value: new Vector3(20,10,-15) }, // Light source position
    windDir: { value: new Vector3(1, 0, 0) }, // Wind direction (for foliage animation)
    windPower: { value: 1.0 }, // Wind power affecting sway
    branchNoise: { value: Math.random() * 10 }, // Random noise for variation
    cameraPosition: { value: new Vector3() }, // Camera position for Fresnel effect
  }), [props.colors]);

  // Update uniforms on every frame
  useFrame(() => {
    if (foliageref.current) {
      const elapsedTime = (Date.now() - startTime) * 0.001; // Convert ms to seconds
      foliageref.current.material.uniforms.uTime.value = elapsedTime;
      foliageref.current.material.uniforms.cameraPosition.value.copy(camera.position); // Update camera position for Fresnel
      foliageref.current.material.needsUpdate = true;
    }
  });

  return (
    <group {...props} dispose={null} scale={1.5}>
      <mesh
        ref={foliageref}
        name="Foliage"
        castShadow
        geometry={nodes.Foliage.geometry}
        material={materials['Stylized Foliage.001']}
        rotation={[0, 0.225, 0]}
      >
        <shaderMaterial
          attach="material"
          {...GhibliShaderAnim}
          uniforms={uniformsghibli} // Use the updated uniforms with cameraPosition
        />
      </mesh>
      <mesh
        name="bark"
        castShadow
        geometry={nodes.bark.geometry}
        material={materials['Material.001']}
        rotation={[0, -1.51, 0]}
      >
        <meshToonMaterial color={'#DD761C'} />
      </mesh>
    </group>
  );
}

useGLTF.preload('/setup.glb');

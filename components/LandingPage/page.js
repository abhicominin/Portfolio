'use client'

import React, {useRef} from 'react'
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Text, Float } from '@react-three/drei';
import { Color } from 'three';
import { Setup } from '../Tree/Setup';
import { Grass } from '../Grass/Grass';
import { Grassbasic } from '../Grass/Grassbasic';

import { Railways } from '../Railways/Railways';

import Wind from '../Wind/Wind';


const LandingPage = () => {

  const fogref = useRef()

  return (
  <main
    id="main"
    className=" toppage h-[100vh] relative overflow-hidden"
    >
    <Canvas style={{backgroundColor: '#181C14'}} camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 24, -44] }}>
      {/* <fog ref={fogref} attach="fog" color="#4A4947" near={80} far={100} /> */}
    
      <Text 
      position={[22,14,29]}
      rotation-y={Math.PI}
      fontSize={15}
      font='/Fonts/ProtestGuerrilla-Regular.ttf'
      color={'#FDE49E'}
      >
        Regal Departure
      </Text>

    
     
      <directionalLight intensity={3.3} position={[8,5,-5]} castShadow/>

      

      <OrbitControls 
      maxZoom={1000}
      minPolarAngle={Math.PI/3}
      maxPolarAngle={Math.PI/2}
      enablePan={true}
      minAzimuthAngle={Math.PI/4}
      maxAzimuthAngle={-Math.PI/4}
      /> 

      <Setup
      rotation={[0,-Math.PI/6,0]}
      position={[-9.3,0,4]}
      colors={[
        new Color("#C0EBA6"),
        new Color("#8FD14F"),
        new Color("#8FD14F"),
        new Color("#6EC207"),
      ]}/>

      <Setup
      fogref={fogref}
      rotation={[0,-Math.PI/12,0]}
      position={[-23.5,0,4]}
      colors={[
        new Color("#C0EBA6"),
        new Color("#8FD14F"),
        new Color("#8FD14F"),
        new Color("#6EC207"),
      ]}/>


      {/* <Grass/> */}

      <Grassbasic/>

      <Railways/>


      {/* <Wind/> */}
      
    </Canvas>  
    
  </main>
  )
}


export default LandingPage

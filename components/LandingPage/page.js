'use client'
import React from 'react'
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Text, Float } from '@react-three/drei';
import { Color } from 'three';
import { Setup } from '../Tree/Setup';
import { Grass } from '../Grass/Grass';
import { Grassbasic } from '../Grass/Grassbasic';


import Wind from '../Wind/Wind';


const LandingPage = () => {

  return (
  <main
    id="main"
    className=" toppage h-[100vh] relative overflow-hidden"
    >
    <Canvas style={{backgroundColor: '#F5F7F8'}} camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 23, 64] }}>

    
      <Text 
      position={[0,-3,-10]}
      fontSize={13}
      font='/Fonts/ProtestGuerrilla-Regular.ttf'
      color={'#4A4947'}
      >
        Save Trees
      </Text>
     
      <directionalLight intensity={2} position={[10,10,10]} castShadow/>

      <Environment preset='dawn'/>

      <OrbitControls 
      minPolarAngle={Math.PI/4}
      maxPolarAngle={Math.PI/2.5}
      enablePan={false}
      enableZoom={false}
      minAzimuthAngle={Math.PI/4}/> 

      <Setup
      rotation={[0,Math.PI/6,0]}
      position={[0,-14,0]}
      colors={[
        new Color("#C0EBA6"),
        new Color("#8FD14F"),
        new Color("#8FD14F"),
        new Color("#6EC207"),
      ]}/>


      <Grass/>

      {/* <Grassbasic/> */}

 

      <Wind/>
      
    </Canvas>  
    
  </main>
  )
}


export default LandingPage

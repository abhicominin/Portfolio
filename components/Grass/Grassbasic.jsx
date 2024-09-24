import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import grassFragmentShader from '../Shaders/grassfragment.glsl'
import grassVertexShader from '../Shaders/grassvertex.glsl'

const PLANE_SIZE = 25
const BLADE_COUNT = 40000
const BLADE_WIDTH = 0.3
const BLADE_HEIGHT = 3.0
const BLADE_HEIGHT_VARIATION = 2.5

export function Grassbasic(props) {
  const { gl, scene } = useThree()
  
  // Define the uniforms with the iTime uniform for animation
  const grassUniforms = useMemo(() => ({
    iTime: { value: 0.0 }, // Time uniform
    textures: { value: [new THREE.TextureLoader().load('/grassfour.jpg'), new THREE.TextureLoader().load('/cloud.jpg')] },
  }), [])

  // Create the ShaderMaterial and pass the uniforms
  const grassMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: grassUniforms,
    vertexShader: grassVertexShader,
    fragmentShader: grassFragmentShader,
    side: THREE.DoubleSide,
    vertexColors: true
  }), [grassUniforms])

  // Create the geometry for the grass blades
  const geom = useMemo(() => {
    const positions = []
    const uvs = []
    const indices = []
    const colors = []

    for (let i = 0; i < BLADE_COUNT; i++) {
      const VERTEX_COUNT = 5
      const surfaceMin = PLANE_SIZE / 2 * -1
      const surfaceMax = PLANE_SIZE / 2
      const radius = PLANE_SIZE / 2

      const r = radius * Math.sqrt(Math.random())
      const theta = Math.random() * 2 * Math.PI
      const x = r * Math.cos(theta)
      const y = r * Math.sin(theta)
      const pos = new THREE.Vector3(x, -15.5, y)

      const uv = [
        convertRange(pos.x, surfaceMin, surfaceMax, 0, 1),
        convertRange(pos.z, surfaceMin, surfaceMax, 0, 1)
      ]

      const blade = generateBlade(pos, i * VERTEX_COUNT, uv)
      blade.verts.forEach(vert => {
        positions.push(...vert.pos)
        uvs.push(...vert.uv)
        colors.push(...vert.color)
      })
      blade.indices.forEach(indice => indices.push(indice))
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3))
    geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2))
    geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3))
    geometry.setIndex(indices)
    geometry.computeVertexNormals()

    return geometry
  }, [])

  const meshRef = useRef()

  // Use startTime to calculate elapsed time
  const startTime = useMemo(() => Date.now(), [])

  // Use the useFrame hook to update the time uniform on each frame
  useFrame(() => {
    if (meshRef.current) {
      const elapsedTime = (Date.now() - startTime) * 1.3
      console.log("Elapsed Time: ", elapsedTime) // Ensure this is updating
      meshRef.current.material.uniforms.iTime.value = elapsedTime
      meshRef.current.material.needsUpdate = true // Ensure material gets updated
    }
  })

  return (
    <mesh ref={meshRef} material={grassMaterial} geometry={geom} />
  )
}

function convertRange(val, oldMin, oldMax, newMin, newMax) {
  return (((val - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin
}

function generateBlade(center, vArrOffset, uv) {
  const MID_WIDTH = BLADE_WIDTH * 0.5
  const TIP_OFFSET = 0.1
  const height = BLADE_HEIGHT + (Math.random() * BLADE_HEIGHT_VARIATION)
  const yaw = Math.random() * Math.PI * 2
  const yawUnitVec = new THREE.Vector3(Math.sin(yaw), 0, -Math.cos(yaw))
  const tipBend = Math.random() * Math.PI * 2
  const tipBendUnitVec = new THREE.Vector3(Math.sin(tipBend), 0, -Math.cos(tipBend))

  const bl = new THREE.Vector3().addVectors(center, yawUnitVec.clone().multiplyScalar(BLADE_WIDTH / 2))
  const br = new THREE.Vector3().addVectors(center, yawUnitVec.clone().multiplyScalar(-BLADE_WIDTH / 2))
  const tl = new THREE.Vector3().addVectors(center, yawUnitVec.clone().multiplyScalar(MID_WIDTH / 2))
  const tr = new THREE.Vector3().addVectors(center, yawUnitVec.clone().multiplyScalar(-MID_WIDTH / 2))
  const tc = new THREE.Vector3().addVectors(center, tipBendUnitVec.clone().multiplyScalar(TIP_OFFSET))

  tl.y += height / 2
  tr.y += height / 2
  tc.y += height

  const black = [0, 0, 0]
  const gray = [0.5, 0.5, 0.5]
  const white = [1.0, 1.0, 1.0]

  const verts = [
    { pos: bl.toArray(), uv, color: black },
    { pos: br.toArray(), uv, color: black },
    { pos: tr.toArray(), uv, color: gray },
    { pos: tl.toArray(), uv, color: gray },
    { pos: tc.toArray(), uv, color: white }
  ]

  const indices = [
    vArrOffset, vArrOffset + 1, vArrOffset + 2,
    vArrOffset + 2, vArrOffset + 4, vArrOffset + 3,
    vArrOffset + 3, vArrOffset, vArrOffset + 2
  ]

  return { verts, indices }
}
import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import { extend, useFrame } from '@react-three/fiber'

extend({ MeshLineGeometry, MeshLineMaterial })

export default function Wind() {
  const dash = 0.001
  const radius = 50

  return (
    <Lines dash={dash} radius={radius} colors={['#ffffff']} />
  )
}

function Lines({ dash, colors, radius = 50 }) {
  const line = useMemo(() => {
    const points = []
    const spiralRadius = 7
    const turns = 3
    const height = 20
    const numPointsPerTurn = 4
    const totalPoints = turns * numPointsPerTurn

    for (let i = 0; i < totalPoints; i++) {
      const t = i / numPointsPerTurn
      const angle = t * Math.PI * 2
      const x = spiralRadius * Math.cos(angle)
      const z = spiralRadius * Math.sin(angle)
      const y = t * (height / turns) - 15

      points.push(new THREE.Vector3(x, y, z))
    }

    return {
      color: colors[0],
      width: 3,
      speed: Math.max(0.1, 1 * Math.random()),
      initialCurve: points,  // Store the initial static points for animation
      curve: points.flatMap((point) => point.toArray())
    }
  }, [colors, radius])

  return <Fatline dash={dash} {...line} />
}

function Fatline({ initialCurve, curve, width, color, speed, dash }) {
  const ref = useRef()
  const curveRef = useRef(initialCurve) // Keep a reference to the initial static points

  const wind = new THREE.TextureLoader().load('/wind.png')
  wind.wrapS = THREE.RepeatWrapping;
  wind.wrapT = THREE.RepeatWrapping;
  wind.repeat.set( 4, 4 );

  useFrame((state, delta) => {
    // Animate points up and down using a sine wave
    const time = state.clock.elapsedTime
    const animatedCurve = curveRef.current.map((point, index) => {
      // Animate only the y position of each point
      const oscillation = Math.sin(time + index * 0.2) * 1  // Oscillation range ±2
      return new THREE.Vector3(point.x, point.y + oscillation, point.z)
    })

    const animatedPoints = new THREE.CatmullRomCurve3(animatedCurve).getPoints(300)
    
    // Use setPoints instead of setPositions for meshLineGeometry
    ref.current.geometry.setPoints(animatedPoints.flatMap((p) => p.toArray()))

    ref.current.material.dashOffset -= (delta * speed) / 50

    ref.current.rotation.y += (delta * speed) / 50
  })

  return (
    <mesh ref={ref}>
      <meshLineGeometry />
      <meshLineMaterial
        map={wind}
        useMap={true}
        transparent
        lineWidth={width}
        color={color}
        depthWrite={false}
        dashArray={0.25}
        dashRatio={dash}
        toneMapped={false}
      />
    </mesh>
  )
}

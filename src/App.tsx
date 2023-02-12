import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { useControls } from 'leva'

function Box(props: ThreeElements['mesh']) {
  // Three-drei 컴포넌트 감싸기
  const mesh = useRef<THREE.Mesh>(null!)

  // Hover 했을 때, 클릭했을 때 상태.
  const [hovered, setHover] = useState<boolean>(false)
  const [active, setActive] = useState<boolean>(false)

  // 회전하게 만들기
  useFrame((state, delta) => (mesh.current.rotation.x += delta))

  // 거칠기 조절하기
  const { roughness } = useControls({ roughness: { value: 1, min: 0, max: 1 } })

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial metalness={1} roughness={roughness} color={hovered ? '#ef4444' : '#3b82f6'} />
    </mesh>
  )
}

export default function App(): JSX.Element {
  return (
    <>
      <h1>React-Fiber-TypeScript</h1>
      <p>마우스를 올리시면 색이 변하고, 클릭하시면 크기가 커집니다.</p>
      <Canvas>
        {/* scene 내의 모든 object들에 전 방향에서 조명을 비춰준다 */}
        <ambientLight intensity={0.5} />
        {/* 손전등. 점에서 시작해 원뿔모양으로 퍼져나간다. */}
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        {/* 모든 방향으로 균일하게 퍼지는 빛. */}
        <pointLight position={[-10, -10, -10]} />
        <Box position={[-1.5, 0, 0]} />
        <Box position={[1.5, 0, 0]} />
      </Canvas>
    </>
  )
}
# 🌌 React, Three-Fiber를 이용한 예제입니다.
:octocat: 바로 가기 : https://light9639.github.io/React-Three-Fiber/

![light9639 github io_React-Three-Fiber_](https://user-images.githubusercontent.com/95972251/218313173-a4c62d8b-cf57-484a-b1d8-422afc7dcf58.png)

:sparkles: 🌌 React, Three-Fiber를 이용한 예제입니다. :sparkles:
## :tada: React 프로젝트 생성
- React 생성
```bash
npm create-react-app my-app
# or
yarn create react-app my-app
```

- vite를 이용하여 프로젝트를 생성하려면
```bash
npm create vite@latest
# or
yarn create vite
```
- 터미널에서 실행 후 프로젝트 이름 만든 후 React 선택, Typescirpt-SWC 선택하면 생성 완료.
## 🪂 three, @react-three/fiber, leva 설치
- `three`, `@react-three/fiber`, `leva` 라이브러리 설치하기
```bash
$ npm install three, @react-three/fiber, leva
# or
$ yarn add three, @react-three/fiber, leva
```
## ✒️ App.tsx, index.css 수정 및 작성
### ⚡ App.tsx
- `@react-three/fiber`와 `@react-three/drei`는 `Three.js`를 리액트 환경에서 더 쉽게 만들어주는 라이브러리로 이 라이브러리를 이용하여 예제 파일을 만들었다.
- 각각의 설정 내용은 밑의 코드에 적혀 있으니 참고하면 될 듯 싶다.
```typescript
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
```
### ⚡ index.css
- 전체적인 CSS 스타일링하기.
```css
* {
  box-sizing: border-box;
}

html,
body,
#root {
  margin: 0;
  padding: 0;
}

body {
  background: url('https://user-images.githubusercontent.com/26748614/96337246-f14d4580-1085-11eb-8793-a86d929e034d.jpg') no-repeat;
  background-size: cover;
}

h1,
p {
  color: #fff;
  text-align: center;
}

canvas {
  margin-top: -150px;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
```

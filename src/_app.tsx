import { Canvas, useThree } from "@react-three/fiber"
import { Suspense } from "react"
import {
  ACESFilmicToneMapping,
  Color,
  EquirectangularReflectionMapping,
  Fog,
  FogExp2,
  sRGBEncoding,
  Vector3
} from "three"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Layout } from "./components"
import { FloatingIsland } from "./FloatingIsland"
import { Portal } from "./Portal"
import { Rocks } from "./Rocks"
import { FloatingRocks } from "./FloatingRocks"
import { Trees } from "./Trees"
import { Grass } from "./Grass"

const { PUBLIC_URL } = process.env

const loadHDR = (url: string) =>
  new RGBELoader().load(
    `${PUBLIC_URL}/${url}`,
    hdri => (hdri.mapping = EquirectangularReflectionMapping)
  )

const useSetupScene = () => {
  const { scene, camera, gl } = useThree()
  camera.near = 0
  camera.far = 70
  camera.position.set(-1.75, 10.85, 20.35)
  camera.lookAt(0, 0, 0)
  gl.outputEncoding = sRGBEncoding
  gl.toneMapping = ACESFilmicToneMapping
  gl.toneMappingExposure = 1
  gl.physicallyCorrectLights = true
  gl.shadowMap.enabled = true
  gl.setPixelRatio(Math.min(devicePixelRatio, 2))
  new OrbitControls(camera, gl.domElement).target = new Vector3(1, 5, 0)
  scene.background = new Color("black")
  scene.environment = loadHDR("textures/envMap.hdr")
  scene.fog = new FogExp2("black", 0.05)
}

const Scene = () => {
  useSetupScene()
  return (
    <Suspense fallback={null}>
      <axesHelper args={[10]} />
      <Rocks />
      <Trees />
      <Portal />
      <Grass />
      <FloatingRocks />
      <FloatingIsland />
    </Suspense>
  )
}

export const MyApp = () => (
  <Layout>
    <Canvas
      gl={{
        alpha: false,
        powerPreference: "high-performance",
        antialias: false
      }}
      camera={{ fov: 50 }}
    >
      <Scene />
    </Canvas>
  </Layout>
)

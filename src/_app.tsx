import { Canvas, useThree } from "@react-three/fiber"
import { useEffect } from "react"
import {
  ACESFilmicToneMapping,
  Color,
  FogExp2,
  sRGBEncoding,
  Vector3,
  EquirectangularReflectionMapping
} from "three"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Layout } from "./components"
import { FloatingIsland, FloatingRocks } from "./models"
import { BridgeProvider } from "./context"
import { useCustomContext, useLoadModels } from "./hooks"

const useSetupScene = () => {
  const { scene, camera, gl } = useThree()
  useEffect(() => {
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
    /* scene.environment = new RGBELoader().load(
    `${process.env.PUBLIC_URL}/textures/envMap.hdr`,
    hdri => (hdri.mapping = EquirectangularReflectionMapping)
    ) */
    scene.background = new Color("black")
    scene.fog = new FogExp2("black", 0.05)
  }, [])
}

const Scene = () => {
  useSetupScene()
  return (
    <>
      <FloatingIsland />
      <FloatingRocks />
      <axesHelper />
    </>
  )
}

export const MyApp = () => {
  useLoadModels()
  return (
    <Layout>
      <Canvas
        gl={{
          alpha: true,
          powerPreference: "high-performance",
          antialias: true
        }}
        camera={{ fov: 50 }}
      >
        <BridgeProvider value={useCustomContext()}>
          <Scene />
        </BridgeProvider>
      </Canvas>
    </Layout>
  )
}

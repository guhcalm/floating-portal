import { Stats } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { EffectComposer, SSR } from "@react-three/postprocessing"
import {
  ACESFilmicToneMapping,
  Color,
  EquirectangularReflectionMapping,
  Fog,
  sRGBEncoding
} from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader"
import { BridgeProvider, useMyContext } from "./context"
import { useLoadModels } from "./hooks"
import { FloatingIsland, FloatingRocks } from "./models"

export const MyScene = () => {
  useLoadModels()
  return (
    <Canvas
      camera={{ fov: 50 }}
      gl={{
        powerPreference: "high-performance",
        logarithmicDepthBuffer: true,
        antialias: false,
        stencil: false,
        alpha: false
      }}
      onCreated={({ scene, camera, gl }) => {
        camera.near = 0.1
        camera.far = 80
        camera.position.set(-1.75, 20.85, 20.35)
        camera.lookAt(0, 10, 0)
        gl.outputEncoding = sRGBEncoding
        gl.toneMapping = ACESFilmicToneMapping
        gl.toneMappingExposure = 1.5
        gl.physicallyCorrectLights = true
        gl.shadowMap.enabled = true
        gl.setPixelRatio(Math.min(devicePixelRatio, 2))
        scene.background = new Color("black")
        scene.fog = new Fog("black", 0, 80)
        scene.environment = new RGBELoader().load(
          "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/empty_warehouse_01_1k.hdr",
          hdri => (hdri.mapping = EquirectangularReflectionMapping)
        )
        new OrbitControls(camera, gl.domElement).update()
      }}
    >
      <BridgeProvider value={useMyContext()}>
        <group position-y={-6}>
          <FloatingIsland />
          <FloatingRocks />
        </group>
      </BridgeProvider>
      <axesHelper args={[10]} />
      <Stats />
    </Canvas>
  )
}

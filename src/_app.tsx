import { Canvas, useThree } from "@react-three/fiber"
import { Suspense, useEffect } from "react"
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
import { MyScene } from "./_scene"

export const MyApp = () => (
  <Layout>
    <MyScene />
  </Layout>
)

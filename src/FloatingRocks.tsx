import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { FrontSide, Mesh, MeshBasicMaterial, Object3D } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Material } from "./DefaultMaterial"

const { PUBLIC_URL } = process.env
const loadModel = (
  name: string,
  setModel: Dispatch<SetStateAction<Object3D>>
) =>
  new GLTFLoader().load(`${PUBLIC_URL}/models/${name}`, ({ scene }) =>
    setModel(() => {
      scene.traverse(object => {
        if (!(object instanceof Mesh)) return
        object.matrixWorldNeedsUpdate = false
        object.material.side = FrontSide
        object.material.dispose()
        object.material = Material
      })
      return scene
    })
  )

export const FloatingRocks = () => {
  const [rockI, setRockI] = useState(new Object3D())
  const [rockII, setRockII] = useState(new Object3D())
  const [rockIII, setRockIII] = useState(new Object3D())
  useEffect(() => {
    loadModel("floating_rock_1.glb", setRockI)
    loadModel("floating_rock_2.glb", setRockII)
    loadModel("floating_rock_3.glb", setRockIII)
  })
  return (
    <>
      <primitive object={rockI} position={[-20.5, -7, -19]} />
      <primitive object={rockII} position={[-5, 10, -33]} />
      <primitive object={rockIII} position={[20, 3.5, -9]} />
    </>
  )
}

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { DoubleSide, FrontSide, Mesh, MeshBasicMaterial, Object3D } from "three"
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
        object.material.envMapIntensity = 3.5
        object.matrixWorldNeedsUpdate = false
        object.material.side = FrontSide
        object.material.dispose()
        object.material = Material
      })
      return scene
    })
  )

export const Portal = () => {
  const [portal, setPortal] = useState(new Object3D())
  const [mask, setMask] = useState(new Object3D())
  useEffect(() => {
    loadModel("portal.glb", setPortal)
    loadModel("portal_mask.glb", setMask)
  })
  return (
    <>
      <primitive object={portal} />
      <primitive object={mask} />
    </>
  )
}

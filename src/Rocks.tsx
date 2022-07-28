import { useEffect, useState } from "react"
import { FrontSide, Group, Mesh, MeshBasicMaterial } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Material } from "./DefaultMaterial"

const { PUBLIC_URL } = process.env

export const Rocks = () => {
  const [model, setModel] = useState(new Group())
  useEffect(() =>
    new GLTFLoader().load(`${PUBLIC_URL}/models/rocks.glb`, ({ scene }) =>
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
  )
  return <primitive object={model} />
}

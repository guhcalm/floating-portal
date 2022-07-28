import { useEffect, useState } from "react"
import { BufferAttribute, Color, FrontSide, Group, Mesh } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Material } from "./DefaultMaterial"

const { PUBLIC_URL } = process.env

export const FloatingIsland = () => {
  const [model, setModel] = useState(new Group())
  useEffect(() =>
    new GLTFLoader().load(
      `${PUBLIC_URL}/models/floating_island.glb`,
      ({ scene }) =>
        setModel(() => {
          scene.traverse(object => {
            if (!(object instanceof Mesh)) return
            object.geometry.setAttribute(
              "uv2",
              new BufferAttribute(object.geometry.attributes.uv.array, 2)
            )
            object.matrixWorldNeedsUpdate = false
            object.material.lightMap = object.material.map
            object.material.lightMapIntensity = 400
            object.material.color = new Color(0.04, 0.06, 0.1)
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

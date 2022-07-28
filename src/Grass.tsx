import { useEffect, useState } from "react"
import { Color, DoubleSide, Group, Mesh, MeshBasicMaterial } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

const { PUBLIC_URL } = process.env

export const Grass = () => {
  const [model, setModel] = useState(new Group())
  useEffect(() =>
    new GLTFLoader().load(`${PUBLIC_URL}/models/grass.glb`, ({ scene }) =>
      setModel(() => {
        scene.traverse(object => {
          if (!(object instanceof Mesh)) return
          object.material.dispose()
          object.material = new MeshBasicMaterial()
          object.material.alphaToCoverage = true
          object.material.transparent = true
          object.material.map = object.material.emissiveMap
          object.material.emissive = new Color(0.5, 0.5, 0.5)
          object.matrixWorldNeedsUpdate = false
          object.material.side = DoubleSide
        })
        return scene
      })
    )
  )
  return <primitive object={model} />
}

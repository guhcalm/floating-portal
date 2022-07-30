import { useEffect } from "react"
import { Mesh, MeshLambertMaterial } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { useMyContext } from "../../context"

const asyncLoadModel = async (name: string) => {
  const { scene } = await new GLTFLoader().loadAsync(`./models/${name}`)
  scene.traverse(object => {
    if (!(object instanceof Mesh)) return
    object.material.dispose()
    object.material = new MeshLambertMaterial({
      color: "#f0f0f0"
    })
    object.castShadow = false
    object.receiveShadow = false
    object.matrixWorldNeedsUpdate = false
  })
  return scene
}

export default () => {
  const { dispatch, actions } = useMyContext()
  useEffect(() => {
    ;(async () =>
      dispatch(
        actions.loadModels({
          floatingIsland: await asyncLoadModel("floating_island.glb"),
          floatingRocksI: await asyncLoadModel("floating_rock_1.glb"),
          floatingRocksII: await asyncLoadModel("floating_rock_2.glb"),
          floatingRocksIII: await asyncLoadModel("floating_rock_3.glb"),
          portal: await asyncLoadModel("portal.glb"),
          trees: await asyncLoadModel("trees.glb"),
          rocks: await asyncLoadModel("rocks.glb"),
          grass: await asyncLoadModel("grass.glb"),
          mask: await asyncLoadModel("portal_mask.glb")
        })
      ))()
  }, [])
}

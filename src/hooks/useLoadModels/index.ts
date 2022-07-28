import { useEffect } from "react"
import { Mesh } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { ClayMaterial } from "../../ClayMaterial"
import { useCustomContext } from ".."

const asyncLoadModel = async (name: string) => {
  const { scene } = await new GLTFLoader().loadAsync(
    `${process.env.PUBLIC_URL}/models/${name}`
  )
  scene.traverse(object => {
    if (!(object instanceof Mesh)) return
    object.material.dispose()
    object.material = ClayMaterial
    object.matrixWorldNeedsUpdate = false
  })
  return scene
}

export default () => {
  const { dispatch, actions } = useCustomContext()
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

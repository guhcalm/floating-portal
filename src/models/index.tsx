import { useBridgeContext } from "../context"

export const FloatingIsland = () => {
  const { floatingIsland, rocks, trees, portal, mask } =
    useBridgeContext().state.models
  return (
    <>
      <primitive object={floatingIsland} />
      <primitive object={rocks} />
      <primitive object={trees} />
      <primitive object={portal} />
      <primitive object={mask} />
    </>
  )
}

export const FloatingRocks = () => {
  const { floatingRocksI, floatingRocksII, floatingRocksIII } =
    useBridgeContext().state.models
  return (
    <>
      <primitive object={floatingRocksI} position={[-20.5, -7, -19]} />
      <primitive object={floatingRocksII} position={[-5, 10, -33]} />
      <primitive object={floatingRocksIII} position={[20, 3.5, -9]} />
    </>
  )
}

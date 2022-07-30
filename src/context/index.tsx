import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer
} from "react"
import { Object3D } from "three"

const initialState = {
  models: {
    floatingIsland: new Object3D(),
    floatingRocksI: new Object3D(),
    floatingRocksII: new Object3D(),
    floatingRocksIII: new Object3D(),
    portal: new Object3D(),
    trees: new Object3D(),
    rocks: new Object3D(),
    grass: new Object3D(),
    mask: new Object3D()
  }
}

type State = typeof initialState
type Action = { type; payload }
type Dispatcher = Dispatch<Action>

export const actions = {
  loadModels: payload => ({ type: "LOAD_MODELS", payload })
}
const reducer = (state: State, { type, payload }: Action) =>
  ({
    LOAD_MODELS: { ...state, models: { ...payload } }
  }[type])

interface CustomContext {
  state: State
  dispatch: Dispatcher
  actions: typeof actions
}

const MyContext = createContext<CustomContext>(null!)
export const useMyContext = () => useContext(MyContext)
export const MyProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <MyContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </MyContext.Provider>
  )
}

const BridgeContext = createContext<CustomContext>(null!)
export const useBridgeContext = () => useContext(BridgeContext)
export const BridgeProvider = ({
  value,
  children
}: {
  value: CustomContext
  children: ReactNode
}) => <BridgeContext.Provider value={value}>{children}</BridgeContext.Provider>

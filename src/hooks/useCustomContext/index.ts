import { useContext } from "react"
import { MyContext, actions } from "../../context"

export default () => {
  const [state, dispatch] = useContext(MyContext)
  return { state, dispatch, actions }
}

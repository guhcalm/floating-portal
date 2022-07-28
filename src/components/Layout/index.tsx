import { ReactNode } from "react"
import Container from "./styles"

export default ({ children: App }: { children: ReactNode }) => {
  return <Container>{App}</Container>
}

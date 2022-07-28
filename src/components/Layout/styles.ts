import styled from "styled-components"
import { ThemeInterface } from "../../interfaces"

export default styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--background);
  background-image: radial-gradient(circle at 0 0, red, transparent),
    radial-gradient(circle at 100% 50%, blue, transparent),
    radial-gradient(circle at 0 100%, yellow, transparent);
`

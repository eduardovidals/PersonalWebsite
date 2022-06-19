import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

// child container is used to prevent horizontal overflow, cannot be applied to main container
// due to aos animations bugging out
export const MainChildContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`

import styled from "styled-components"

export const FormContainer=styled.div` width: 100%;
;
display: flex;
align-items: center;
justify-content: center;
flex-wrap: wrap;
gap: 0.5rem;
color: ${props => props.theme['gray-100']};
font-size: 1.125rem;
font-weight: bold;
-webkit-font-smoothing: antialiased;
`


const BaseInput = styled.input`
  background: transparent;
  height: 100%;
  border: 0;
  border-bottom: 2px solid ${props => props.theme['gray-500']};
  font-size: 1.125rem;
  font-weight: bold;
  color: ${props => props.theme['gray-100']};
  padding: 0 0.5rem;

  &::placeholder {
    color: ${props => props.theme['gray-500']}
  }

  &:focus {
    box-shadow: none;
    border-color: ${props => props.theme['green-500']};
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none;
  }
`

export const MinutesAmountInput = styled(BaseInput)` 
  width: 4rem;
  text-align: center;
`
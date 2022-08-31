import React from "react"
import { CyclesContext } from "../../../contexts/CycleContext"
import { useFormContext } from "react-hook-form"
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles"

export const NewCycleForm = () => { 
  const { activeCycle } = React.useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
        <label htmlFor="task">Vou trabalhar em</label>
        <TaskInput 
          type="text" 
          id="task" 
          placeholder="Dê um nome para o seu projeto"
          list="task-suggestion"
          disabled={!!activeCycle}
          { ...register('task')}
        />

        <datalist id="task-suggestion">
          <option value="Projeto 1"/>
          <option value="Projeto 2"/>
          <option value="Projeto 3"/>
          <option value="Projeto 4"/>
        </datalist>

        <label htmlFor="minutesAmount">durante</label>
        <MinutesAmountInput 
          type="number" 
          id="minutesAmount" 
          placeholder="00"
          step={1}
          min={1}
          max={60}
          disabled={!!activeCycle}
          { ...register('minutesAmount', {valueAsNumber: true})}
        />

        <span>minutos</span>
      </FormContainer>
  )
}
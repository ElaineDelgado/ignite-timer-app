import React from 'react'
import { Play, HandPalm } from "phosphor-react"

import {FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { CyclesContext } from '../../contexts/CycleContext'
import { NewCycleForm } from './NewCycleForm'
import { Countdown } from './Countdown'
import { 
  HomeContainer,
  StartCountdownButton, 
  StopCountdownButton,
} from "./styles"

/**
 * 
 *  function register(name:string) {
 * return (
 * onChange: () => void
 * onBlur: () => void
 * onFocus: () => void
 * e outros metodos...
 * )
 * }
 */


const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
  .number()
  .min(1, 'Mínimo de 1 minuto')
  .max(60, 'Máximo de 60 minutos')
})

// interface NewCycleFormData {
//   task: string
//   minutesAmount: number
// }

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export const Home = () => {
  const {createNewCicle, interruptCycle, activeCycle} = React.useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  const {handleSubmit, watch, reset} = newCycleForm

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    createNewCicle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>           
            <FormProvider {...newCycleForm}>
              <NewCycleForm />
            </FormProvider>
            <Countdown />

        { activeCycle? (
          <StopCountdownButton onClick={interruptCycle} type="button">
            <HandPalm size={24}/>
            Pausar
          </StopCountdownButton>
          ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24}/>
            Começar
          </StartCountdownButton>
          )
        }

      </form>
    </HomeContainer>
  )
}
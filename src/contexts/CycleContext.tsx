import { differenceInSeconds } from 'date-fns'
import React from 'react'
import {  
  addNewCycleAction, 
  interruptCycleAction, 
  markCurrentCycleAsFinishedAction } from '../reducers/cycles/actions'

import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[] 
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  secondsPassedAmount: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCicle: (data: CreateCycleData) => void
  interruptCycle: () => void
}

export const CyclesContext = React.createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: React.ReactNode
}

export const CyclesContextProvider = ({ children }: CyclesContextProviderProps) => {
  const [cyclesState, dispatch] = React.useReducer(
    cyclesReducer, 
    {
      cycles: [], 
      activeCycleId: null,
    },
    () => {
      const storedStateAsJSON: string | null = localStorage.getItem('@timer: cycle-state-1.0.0')
      if(storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }
      return {
        cycles: [], 
        activeCycleId: null,
      }
    }   
  )

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId) 

  const [ secondsPassedAmount, setSecondsPassedAmount] = React.useState(() => {
    if(activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    
    return 0
  })

  React.useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@timer: cycle-state-1.0.0', stateJSON)
  }, [cyclesState])

  const setSecondsPassed = (seconds: number) => {
    setSecondsPassedAmount(seconds)
  }

  const markCurrentCycleAsFinished = () => {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  const createNewCicle = (data: CreateCycleData) => {
    const id = String(new Date().getTime())

      const newCycle: Cycle = {
        id,
        task: data.task,
        minutesAmount: data.minutesAmount,
        startDate: new Date()
      }

      dispatch(addNewCycleAction(newCycle))
      setSecondsPassedAmount(0)
  }

  const interruptCycle = () => {    
    dispatch(interruptCycleAction())
  } 

  return (
    <CyclesContext.Provider 
            value={{
              cycles,
              activeCycle, 
              activeCycleId, 
              secondsPassedAmount,
              markCurrentCycleAsFinished, 
              setSecondsPassed,
              createNewCicle,
              interruptCycle,
            }}
            >
            {children}
    </CyclesContext.Provider>
  )
}
/* eslint-disable default-param-last */
import { combineReducers } from '@reduxjs/toolkit'

import {
  CHEAPEST_VARIANT,
  FASTEST_VARIANT,
  OPTIMAL_VARIANT,
  ALL_TRANSFER,
  WITHOUT_TRANSFER,
  ONE_TRANSFER,
  TWO_TRANSFER,
  THREE_TRANSFER,
  SHOW_MORE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
} from './type'

const initialStateData = {
  loading: false,
  error: null,
  data: {},
  displayedData: [],
  currentPage: 0,
  pageSize: 5,
}

export const reducerData = (state = initialStateData, action) => {
  switch (action.type) {
    case CHEAPEST_VARIANT: {
      if (!state.data?.tickets) return state
      const newState = {
        ...state,
        currentPage: 0,
        data: {
          ...state.data,
          tickets: [...state.data.tickets].sort((a, b) => a.price - b.price),
        },
      }

      return {
        ...newState,
        displayedData: [
          ...newState.data.tickets.slice(
            0,
            newState.pageSize * newState.currentPage + newState.pageSize
          ),
        ],
      }
    }
    case FASTEST_VARIANT: {
      if (!state.data?.tickets) return state

      const newState = {
        ...state,
        currentPage: 0,
        data: {
          ...state.data,
          tickets: [...state.data.tickets].sort(
            (a, b) => a.segments[0].duration - b.segments[0].duration
          ),
        },
      }
      return {
        ...newState,
        displayedData: [
          ...newState.data.tickets.slice(
            0,
            newState.pageSize * newState.currentPage + newState.pageSize
          ),
        ],
      }
    }
    case OPTIMAL_VARIANT: {
      if (!state.data?.tickets) return state

      const newState = {
        ...state,
        currentPage: 0,
        data: {
          ...state.data,
          tickets: [...state.data.tickets].sort((a, b) => {
            const restCostPerMinute = 20
            const optVar1 = a.price + a.segments[0].duration * restCostPerMinute
            const optVar2 = b.price + b.segments[0].duration * restCostPerMinute
            return optVar1 - optVar2
          }),
        },
      }
      return {
        ...newState,
        displayedData: [
          ...newState.data.tickets.slice(
            0,
            newState.pageSize * newState.currentPage + newState.pageSize
          ),
        ],
      }
    }

    case SHOW_MORE: {
      if (!state.data?.tickets) return state
      const newState = { ...state, currentPage: state.currentPage + 1 }
      return {
        ...newState,
        displayedData: [
          ...newState.data.tickets.slice(
            0,
            newState.pageSize * newState.currentPage + newState.pageSize
          ),
        ],
      }
    }

    case FETCH_DATA_REQUEST:
      return { ...state, loading: true, error: null }
    case FETCH_DATA_SUCCESS:
      // return {
      //   ...state,
      //   loading: false,
      //   data: {
      //     tickets: [...state.data.tickets, ...action.payload.tickets],
      //     stop: action.payload.stop,
      //   },
      // }
      return { ...state, loading: false, data: action.payload }
    case FETCH_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

const initialStateFilter = {
  all: false,
  without: false,
  one: false,
  two: false,
  three: false,
}

export const reducerFilter = (state = initialStateFilter, action) => {
  const calculateAllState = (stateN) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    [stateN.without, stateN.one, stateN.two, stateN.three].every(Boolean)

  switch (action.type) {
    case ALL_TRANSFER: {
      const newAllState = !state.all
      return {
        ...state,
        all: newAllState,
        without: newAllState,
        one: newAllState,
        two: newAllState,
        three: newAllState,
      }
    }
    case WITHOUT_TRANSFER: {
      const newState = { ...state, without: !state.without }
      return { ...newState, all: calculateAllState(newState) }
    }
    case ONE_TRANSFER: {
      const newState = { ...state, one: !state.one }
      return { ...newState, all: calculateAllState(newState) }
    }
    case TWO_TRANSFER: {
      const newState = { ...state, two: !state.two }
      return { ...newState, all: calculateAllState(newState) }
    }
    case THREE_TRANSFER: {
      const newState = { ...state, three: !state.three }
      return { ...newState, all: calculateAllState(newState) }
    }

    default:
      return state
  }
}

export const reducer = combineReducers({
  reducerData,
  reducerFilter,
})

export const loggerMiddleWare = (store) => (next) => (action) => {
  // console.log('logger before > ', store.getState())
  const result = next(action)
  console.log('LOGGER reducerData after> ', store.getState()?.reducerData)
  return result
}

// export const schedulerMiddleware = (store) => (next) => (action) => {
//   const delayMW = action?.meta?.delay
//   if (!delayMW) return next(action)

//   const timerId = setTimeout(() => next(action), delayMW)

//   return () => {
//     console.log('clianing')
//     clearTimeout(timerId)
//   }
// }

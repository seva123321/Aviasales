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
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
} from './type'

const initialStateData = {
  loading: false,
  error: null,
  data: {},
}

export const reducerData = (state = initialStateData, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return { ...state, loading: true, error: null }
    case FETCH_DATA_SUCCESS:
      return { ...state, loading: false, data: action.payload }
    case FETCH_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const reducerSorter = (state = initialStateData.data, action) => {
  switch (action.type) {
    case CHEAPEST_VARIANT: {
      return { ...state }
    }
    case FASTEST_VARIANT:
      return {}
    case OPTIMAL_VARIANT:
      return {}

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
  reducerSorter,
  reducerFilter,
})

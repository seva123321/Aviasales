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

const initialStateSorter = {}

export const reducerSorter = (state = initialStateSorter, action) => {
  switch (action.type) {
    case CHEAPEST_VARIANT: {
      //   const { data } = state
      //   console.log('state ', state)
      //   console.log('reducer ', data)

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

const initialStateFilter = {}

export const reducerFilter = (state = initialStateFilter, action) => {
  switch (action.type) {
    case ALL_TRANSFER:
      return {}
    case WITHOUT_TRANSFER:
      return {}
    case ONE_TRANSFER:
      return {}
    case TWO_TRANSFER:
      return {}
    case THREE_TRANSFER:
      return {}

    default:
      return state
  }
}

export const reducer = combineReducers({
  reducerData,
  reducerSorter,
  reducerFilter,
})

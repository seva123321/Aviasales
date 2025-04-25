import {
  ALL_TRANSFER,
  WITHOUT_TRANSFER,
  ONE_TRANSFER,
  TWO_TRANSFER,
  THREE_TRANSFER,
  CHEAPEST_VARIANT,
  FASTEST_VARIANT,
  OPTIMAL_VARIANT,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
} from './type'

export function filterAll() {
  return {
    type: ALL_TRANSFER,
  }
}

export function filterWithout() {
  return {
    type: WITHOUT_TRANSFER,
  }
}

export function filterOneTransfer() {
  return {
    type: ONE_TRANSFER,
  }
}

export function filterTwoTransfer() {
  return {
    type: TWO_TRANSFER,
  }
}

export function filterThreeTransfer() {
  return {
    type: THREE_TRANSFER,
  }
}
export function sortCheapest(payload) {
  return {
    type: CHEAPEST_VARIANT,
    payload,
  }
}
export function sortFastest(payload) {
  return {
    type: FASTEST_VARIANT,
    payload,
  }
}
export function sortOptimal(payload) {
  return {
    type: OPTIMAL_VARIANT,
    payload,
  }
}
export function ticketsLoadingStarted() {
  return {
    type: FETCH_DATA_REQUEST,
  }
}
export function ticketsLoaded(payload) {
  return {
    type: FETCH_DATA_SUCCESS,
    payload,
  }
}
export function ticketsLoadingFailed(payload) {
  return {
    type: FETCH_DATA_FAILURE,
    payload,
  }
}

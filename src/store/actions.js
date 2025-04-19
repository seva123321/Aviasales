import {
  ALL_TRANSFER,
  WITHOUT_TRANSFER,
  ONE_TRANSFER,
  TWO_TRANSFER,
  THREE_TRANSFER,
  CHEAPEST_VARIANT,
  FASTEST_VARIANT,
  OPTIMAL_VARIANT,
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
export function sortCheapest() {
  return {
    type: CHEAPEST_VARIANT,
  }
}
export function sortFastest() {
  return {
    type: FASTEST_VARIANT,
  }
}
export function sortOptimal() {
  return {
    type: OPTIMAL_VARIANT,
  }
}

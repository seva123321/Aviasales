/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable default-param-last */

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
  FETCH_DATA_ALL_LOADED,
} from './type'

const initialStateData = {
  loading: false,
  allLoaded: false,
  error: null,
  data: { tickets: [], stop: false },
  filter: {
    all: true,
    without: true,
    one: true,
    two: true,
    three: true,
  },
  displayedData: [],
  dataFiltered: [],
  sortType: '',
  currentPage: 0,
  pageSize: 5,
}
const calculateFilterState = (stateN) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  [stateN.without, stateN.one, stateN.two, stateN.three].every(Boolean)

const filterTickets = (tickets, filter) => {
  if (!tickets) return []
  if (filter.all) return tickets

  return tickets.filter((ticket) => {
    const { segments } = ticket
    const transferCount = segments.map((segment) => segment.stops.length)

    return (
      (filter.without && transferCount.some((count) => count === 0)) ||
      (filter.one && transferCount.some((count) => count === 1)) ||
      (filter.two && transferCount.some((count) => count === 2)) ||
      (filter.three && transferCount.some((count) => count === 3))
    )
  })
}

const updateDisplayedData = ({ data, currentPage, pageSize }) => [
  ...data.slice(0, (currentPage + 1) * pageSize),
]

const sortCheapest = (data) => data.slice().sort((a, b) => a.price - b.price)

const sortFastest = (data) =>
  data.slice().sort((a, b) => a.segments[0].duration - b.segments[0].duration)

const sortOptimal = (data) =>
  data.slice().sort((a, b) => {
    const restCostPerMinute = 20
    const optVar1 = a.price + a.segments[0].duration * restCostPerMinute
    const optVar2 = b.price + b.segments[0].duration * restCostPerMinute
    return optVar1 - optVar2
  })

const getDataSorted = (sortType, filteredTickets) => {
  switch (sortType) {
    case 'cheapest':
      return sortCheapest(filteredTickets)
    case 'fastest':
      return sortFastest(filteredTickets)
    case 'optimal':
      return sortOptimal(filteredTickets)
    default:
      return filteredTickets
  }
}

const getDataFilteredSorted = (state, filter) => {
  const filterIsChanged =
    JSON.stringify(filter) === JSON.stringify(state.filter)

  const filteredTickets = !filterIsChanged
    ? filterTickets(state.data.tickets, filter)
    : state.dataFiltered

  const dataFilterSort = getDataSorted(state.sortType, filteredTickets)

  return dataFilterSort
}

const reducer = (state = initialStateData, action) => {
  switch (action.type) {
    case CHEAPEST_VARIANT: {
      if (!state.dataFiltered?.length) return state

      const sortedTickets = sortCheapest(state.dataFiltered)
      const displayedData = updateDisplayedData({
        data: sortedTickets,
        currentPage: 0,
        pageSize: state.pageSize,
      })

      return {
        ...state,
        sortType: 'cheapest',
        currentPage: 0,
        displayedData,
      }
    }
    case FASTEST_VARIANT: {
      if (!state.dataFiltered?.length) return state

      const sortedTickets = sortFastest(state.dataFiltered)
      const displayedData = updateDisplayedData({
        data: sortedTickets,
        currentPage: 0,
        pageSize: state.pageSize,
      })

      return {
        ...state,
        sortType: 'fastest',
        currentPage: 0,
        displayedData,
      }
    }
    case OPTIMAL_VARIANT: {
      if (!state.dataFiltered?.length) return state

      const sortedTickets = sortOptimal(state.dataFiltered)
      const displayedData = updateDisplayedData({
        data: sortedTickets,
        currentPage: 0,
        pageSize: state.pageSize,
      })

      return {
        ...state,
        sortType: 'optimal',
        currentPage: 0,
        displayedData,
      }
    }

    case SHOW_MORE: {
      if (!state.dataFiltered?.length) return state
      const newPage = state.currentPage + 1

      const dataFilteredSorted = getDataFilteredSorted(state, state.filter)
      const displayedData = updateDisplayedData({
        data: dataFilteredSorted,
        currentPage: newPage,
        pageSize: state.pageSize,
      })

      return {
        ...state,
        currentPage: newPage,
        displayedData,
      }
    }

    case FETCH_DATA_REQUEST:
      return { ...state, loading: true, error: null }

    case FETCH_DATA_SUCCESS: {
      const newTickets = [...action.payload.tickets]
      const filteredTickets = filterTickets(newTickets, state.filter)
      const sortedTickets = getDataSorted(state.sortType, filteredTickets)

      const displayedData = updateDisplayedData({
        data: sortedTickets,
        currentPage: state.currentPage,
        pageSize: state.pageSize,
      })

      return {
        ...state,
        loading: false,
        data: {
          tickets: newTickets,
          stop: action.payload.stop,
        },
        dataFiltered: sortedTickets,
        displayedData,
      }
    }
    case FETCH_DATA_ALL_LOADED:
      return { ...state, allLoaded: true }
    case FETCH_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload }

    case ALL_TRANSFER: {
      const newAllState = !state.filter.all
      const newFilter = {
        all: newAllState,
        without: newAllState,
        one: newAllState,
        two: newAllState,
        three: newAllState,
      }

      const dataFilteredSorted = getDataFilteredSorted(state, newFilter)
      const displayedData = updateDisplayedData({
        data: dataFilteredSorted,
        currentPage: 0,
        pageSize: state.pageSize,
      })
      return {
        ...state,
        loading: false,
        filter: newFilter,
        dataFiltered: dataFilteredSorted,
        displayedData,
      }
    }
    case WITHOUT_TRANSFER: {
      const newFilter = { ...state.filter, without: !state.filter.without }
      const newState = {
        ...state,
        filter: newFilter,
      }

      const dataFilteredSorted = getDataFilteredSorted(state, newFilter)
      const displayedData = updateDisplayedData({
        data: dataFilteredSorted,
        currentPage: 0,
        pageSize: state.pageSize,
      })

      return {
        ...newState,
        currentPage: 0,
        filter: {
          ...newState.filter,
          all: calculateFilterState(newState.filter),
        },
        dataFiltered: dataFilteredSorted,
        displayedData,
      }
    }
    case ONE_TRANSFER: {
      const newFilter = { ...state.filter, one: !state.filter.one }
      const newState = {
        ...state,
        filter: newFilter,
      }

      const dataFilteredSorted = getDataFilteredSorted(state, newFilter)
      const displayedData = updateDisplayedData({
        data: dataFilteredSorted,
        currentPage: 0,
        pageSize: state.pageSize,
      })

      return {
        ...newState,
        currentPage: 0,
        filter: {
          ...newState.filter,
          all: calculateFilterState(newState.filter),
        },
        dataFiltered: dataFilteredSorted,
        displayedData,
      }
    }
    case TWO_TRANSFER: {
      const newFilter = { ...state.filter, two: !state.filter.two }
      const newState = {
        ...state,
        filter: newFilter,
      }

      const dataFilteredSorted = getDataFilteredSorted(state, newFilter)
      const displayedData = updateDisplayedData({
        data: dataFilteredSorted,
        currentPage: 0,
        pageSize: state.pageSize,
      })

      return {
        ...newState,
        currentPage: 0,
        filter: {
          ...newState.filter,
          all: calculateFilterState(newState.filter),
        },
        dataFiltered: dataFilteredSorted,
        displayedData,
      }
    }
    case THREE_TRANSFER: {
      const newFilter = { ...state.filter, three: !state.filter.three }
      const newState = {
        ...state,
        filter: newFilter,
      }

      const dataFilteredSorted = getDataFilteredSorted(state, newFilter)

      const displayedData = updateDisplayedData({
        data: dataFilteredSorted,
        currentPage: 0,
        pageSize: state.pageSize,
      })
      return {
        ...newState,
        currentPage: 0,
        filter: {
          ...newState.filter,
          all: calculateFilterState(newState.filter),
        },
        dataFiltered: dataFilteredSorted,
        displayedData,
      }
    }

    default:
      return state
  }
}

export default reducer

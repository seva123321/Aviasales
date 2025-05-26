/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import ApiRequest from '@/service/apiRequest'

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

const getSortCheapest = (data) => data.sort((a, b) => a.price - b.price)

const getSortFastest = (data) =>
  data.sort((a, b) => a.segments[0].duration - b.segments[0].duration)

const getSortOptimal = (data) =>
  data.sort((a, b) => {
    const restCostPerMinute = 20
    const optVar1 = a.price + a.segments[0].duration * restCostPerMinute
    const optVar2 = b.price + b.segments[0].duration * restCostPerMinute
    return optVar1 - optVar2
  })

const getDataSorted = (sortType, filteredTickets) => {
  switch (sortType) {
    case 'cheapest':
      return getSortCheapest(filteredTickets)
    case 'fastest':
      return getSortFastest(filteredTickets)
    case 'optimal':
      return getSortOptimal(filteredTickets)
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

const api = new ApiRequest()

export const fetchSearchId = createAsyncThunk(
  'data/searchId',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getSearchId()
      return response
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const fetchTickets = createAsyncThunk(
  'data/tickets',
  async (searchId, { rejectWithValue }) => {
    try {
      const response = await api.getTickets(searchId)
      return response
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (_, { dispatch, rejectWithValue }) => {
    // let tempNumber = 0
    let retryCount = 0
    const maxRetries = 5
    let allTickets = []
    let stop = false
    try {
      // 1. Получаем searchId
      const searchId = await dispatch(fetchSearchId()).unwrap()
      if (!searchId) throw new Error('Не удалось получить searchId')
      while (!stop && retryCount < maxRetries) {
        try {
          // 2. Получаем tickets
          const ticketsData = await dispatch(fetchTickets(searchId)).unwrap()
          console.log('ticketsData > ', ticketsData)

          allTickets = [...allTickets, ...ticketsData.tickets]
          // tempNumber++
          retryCount = 0
          stop = ticketsData.stop

          if (stop) {
            return
          }

          return ticketsData
        } catch (err) {
          if (++retryCount >= maxRetries) throw err
          await new Promise((resolve) => {
            setTimeout(resolve, 1000)
          })
        }
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
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

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    filterAll(state) {
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
        loading: '',
        filter: newFilter,
        dataFiltered: dataFilteredSorted,
        displayedData,
      }
    },
    filterWithout(state) {
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
    },
    filterOneTransfer(state, action) {
      console.log('action, state > ', action, state)
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
    },
    filterTwoTransfer(state) {
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
    },
    filterThreeTransfer(state) {
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
    },

    sortCheapest(state) {
      if (!state.dataFiltered?.length) return state

      const sortedTickets = getSortCheapest(state.dataFiltered)
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
    },
    sortFastest(state) {
      if (!state.dataFiltered?.length) return state

      const sortedTickets = getSortFastest(state.dataFiltered)
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
    },
    sortOptimal(state) {
      if (!state.dataFiltered?.length) return state

      const sortedTickets = getSortOptimal(state.dataFiltered)
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
    },

    ticketsShowMore(state) {
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
    },
  },
  extraReducers: (builder) => {
    builder
      // Обработка fetchSearchId
      .addCase(fetchSearchId.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })

      // Обработка fetchTickets
      .addCase(fetchTickets.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.data.tickets = [...state.data.tickets, ...action.payload.tickets]
        state.data.stop = action.payload.stop
        state.loading = action.payload.stop ? 'idle' : 'pending'
        state.allLoaded = action.payload.stop

        // Фильтрация и сортировка данных
        state.dataFiltered = getDataFilteredSorted(state, state.filter)
        state.dataFiltered = updateDisplayedData({
          data: state.dataFiltered,
          currentPage: state.currentPage,
          pageSize: state.pageSize,
        })
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload
      })

      // Обработка fetchData
      .addCase(fetchData.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload
      })
  },
})

export const {
  filterAll,
  filterWithout,
  filterOneTransfer,
  filterTwoTransfer,
  filterThreeTransfer,
  sortCheapest,
  sortFastest,
  sortOptimal,
  ticketsShowMore,
} = ticketsSlice.actions

export default ticketsSlice.reducer

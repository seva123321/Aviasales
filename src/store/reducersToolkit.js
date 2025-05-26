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
    JSON.stringify(filter) !== JSON.stringify(state.filter)

  const filteredTickets = filterIsChanged
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
  async (searchId) => {
    const response = await api.getTickets(searchId)
    return response
  }
)

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (_, { dispatch, rejectWithValue }) => {
    let retryCount = 0
    const maxRetries = 5
    let allTickets = []
    let stop = false

    try {
      // 1. Получаем searchId
      const searchId = await dispatch(fetchSearchId()).unwrap()
      if (!searchId) throw new Error('Не удалось получить searchId')

      await dispatch(fetchTickets(searchId)).unwrap()
      if (stop) return
      // 2. Получаем первую пачку
      const firstBatch = await api.getTickets(searchId)
      dispatch({
        type: 'data/tickets/fulfilled',
        payload: {
          tickets: firstBatch.tickets,
          stop: firstBatch.stop,
        },
      })

      while (!stop && retryCount < maxRetries) {
        try {
          // 3. Получаем tickets
          const { tickets, stop: isStop } = await api.getTickets(searchId)
          allTickets = [...allTickets, ...tickets]
          stop = isStop

          if (stop) {
            dispatch({
              type: 'data/tickets/fulfilled',
              payload: {
                tickets: allTickets,
                stop: isStop,
              },
            })
            return
          }
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

      state.currentPage = 0
      state.filter = newFilter
      state.dataFiltered = dataFilteredSorted
      state.displayedData = displayedData
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

      state.currentPage = 0
      state.filter = {
        ...newState.filter,
        all: calculateFilterState(newState.filter),
      }
      state.dataFiltered = dataFilteredSorted
      state.displayedData = displayedData
    },
    filterOneTransfer(state) {
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

      state.currentPage = 0
      state.filter = {
        ...newState.filter,
        all: calculateFilterState(newState.filter),
      }
      state.dataFiltered = dataFilteredSorted
      state.displayedData = displayedData
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

      state.currentPage = 0
      state.filter = {
        ...newState.filter,
        all: calculateFilterState(newState.filter),
      }
      state.dataFiltered = dataFilteredSorted
      state.displayedData = displayedData
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
      state.currentPage = 0
      state.filter = {
        ...newState.filter,
        all: calculateFilterState(newState.filter),
      }
      state.dataFiltered = dataFilteredSorted
      state.displayedData = displayedData
    },

    sortCheapest(state) {
      state.sortType = 'cheapest'
      state.currentPage = 0
      state.displayedData = updateDisplayedData({
        data: getSortCheapest(state.dataFiltered),
        currentPage: 0,
        pageSize: state.pageSize,
      })
    },
    sortFastest(state) {
      state.sortType = 'fastest'
      state.currentPage = 0
      state.displayedData = updateDisplayedData({
        data: getSortFastest(state.dataFiltered),
        currentPage: 0,
        pageSize: state.pageSize,
      })
    },
    sortOptimal(state) {
      state.sortType = 'optimal'
      state.currentPage = 0
      state.displayedData = updateDisplayedData({
        data: getSortOptimal(state.dataFiltered),
        currentPage: 0,
        pageSize: state.pageSize,
      })
    },

    ticketsShowMore(state) {
      const newPage = state.currentPage + 1
      const dataFilteredSorted = getDataFilteredSorted(state, state.filter)
      const displayedData = updateDisplayedData({
        data: dataFilteredSorted,
        currentPage: newPage,
        pageSize: state.pageSize,
      })

      state.displayedData = displayedData
      state.currentPage = newPage
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
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.data.tickets = [...state.data.tickets, ...action.payload.tickets]
        state.data.stop = action.payload.stop
        state.loading = 'idle'
        state.allLoaded = action.payload.stop
        state.error = null
        // Фильтрация и сортировка данных
        state.dataFiltered = filterTickets(state.data.tickets, state.filter)
        state.displayedData = updateDisplayedData({
          data: getDataSorted(state.sortType, state.dataFiltered),
          currentPage: state.currentPage,
          pageSize: state.pageSize,
        })
      })

      .addCase(fetchTickets.rejected, (state, action) => {
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

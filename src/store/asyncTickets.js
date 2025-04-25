import {
  sortCheapest,
  ticketsLoadingStarted,
  ticketsLoaded,
  ticketsLoadingFailed,
} from '@/store/actions'
import ApiRequest from '@/service/apiRequest'

const api = new ApiRequest()

const fetchTickets = () => async (dispatch) => {
  dispatch(ticketsLoadingStarted())
  try {
    let retryCount = 0
    const maxCount = 5
    const searchId = await api.getSearchId()

    while (retryCount < maxCount) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const dataTickets = await api.getTickets(searchId)
        dispatch(ticketsLoaded(dataTickets))
        dispatch(sortCheapest(dataTickets))
        return
      } catch (err) {
        retryCount++
        if (retryCount >= maxCount) throw err
        // eslint-disable-next-line no-await-in-loop
        await new Promise((resolve) => {
          setTimeout(resolve, 1000)
        })
      }
    }
  } catch (error) {
    dispatch(ticketsLoadingFailed(error.message))
  }
}

export default fetchTickets

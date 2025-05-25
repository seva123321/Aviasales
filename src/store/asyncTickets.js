import {
  ticketsLoadingStarted,
  ticketsLoaded,
  ticketsLoadingFailed,
  ticketsAllLoaded,
} from '@/store/actions'
import ApiRequest from '@/service/apiRequest'

const api = new ApiRequest()

const fetchTickets = () => async (dispatch) => {
  dispatch(ticketsLoadingStarted())
  try {
    let tempNumber = 0
    let retryCount = 0
    const maxRetries = 5
    let allTickets = []
    let stop = false
    const searchId = await api.getSearchId()

    while (!stop && retryCount < maxRetries) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const { tickets, stop: isStop } = await api.getTickets(searchId)
        allTickets = [...allTickets, ...tickets]

        if (!tempNumber) dispatch(ticketsLoaded({ tickets, stop: isStop }))

        tempNumber++
        retryCount = 0
        stop = isStop

        if (stop) {
          dispatch(ticketsAllLoaded())
          dispatch(ticketsLoaded({ tickets: allTickets, stop: true }))
          return
        }
      } catch (err) {
        if (++retryCount >= maxRetries) throw err
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

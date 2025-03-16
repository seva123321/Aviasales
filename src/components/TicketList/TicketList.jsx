import { memo, useEffect, useMemo, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ApiRequest from '../../service/apiRequest'
import TicketItem from '../Ticket/TicketItem'

import style from './TicketList.module.scss'

const TicketList = memo(() => {
  const api = useMemo(() => new ApiRequest(), [])
  const dispatch = useDispatch()
  const { loading, error, data } = useSelector((state) => state.reducerData)

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_DATA_REQUEST' })
        const res = await api.getSearchId()
        const { searchId } = res
        localStorage.setItem('searchId', searchId)

        const dataTickets = await api.getTickets(searchId)
        dispatch({ type: 'FETCH_DATA_SUCCESS', payload: dataTickets })
      } catch (err) {
        dispatch({ type: 'FETCH_DATA_FAILURE', payload: err })
      }
    }

    fetchData()
  }, [api, dispatch])

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error</h1>

  const dataTickets = data.tickets ? data.tickets.slice(0, 5) : []

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <ul>
        {dataTickets.map((ticket) => {
          const { price, carrier, segments } = ticket
          const key = `${price}${carrier}${segments[0]?.date}`

          return <TicketItem {...ticket} key={key} />
        })}
      </ul>
      <button className={style.button} type="button">
        Показать еще 5 билетов!
      </button>
    </Suspense>
  )
})

export default TicketList

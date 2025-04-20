import { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TicketItem from '@/components/Ticket/TicketItem'
import fetchTickets from '@/store/asyncTickets'

import style from './TicketList.module.scss'

const TicketList = memo(() => {
  const dispatch = useDispatch()
  const { loading, error, data } = useSelector((state) => state.reducerData)

  useEffect(() => {
    dispatch(fetchTickets())
  }, [dispatch])

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error</h1>

  const dataTickets = data.tickets ? data.tickets.slice(0, 5) : []

  return (
    <>
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
    </>
  )
})

export default TicketList

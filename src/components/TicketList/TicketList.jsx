import { memo, useEffect, useMemo, useState, Suspense } from 'react'

import ApiRequest from '../../service/apiRequest'
import TicketItem from '../Ticket/TicketItem'

import style from './TicketList.module.scss'

const TicketList = memo(() => {
  const api = useMemo(() => new ApiRequest(), [])
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      const res = await api.getSearchId()
      const { searchId } = res
      localStorage.setItem('searchId', searchId)

      const dataTickets = await api.getTickets(searchId)
      if (isMounted) {
        setTickets(dataTickets.tickets.slice(0, 5)) // @TODO delete .slice(0,5)
      }
    }

    fetchData()

    return () => {
      isMounted = false // Очистка при размонтировании
    }
  }, [api])

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <ul>
        {tickets?.map((ticket) => {
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

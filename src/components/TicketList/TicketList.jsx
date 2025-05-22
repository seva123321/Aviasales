import { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TicketItem from '@/components/TicketItem'
import fetchTickets from '@/store/asyncTickets'
import { ticketsShowMore } from '@/store/actions'

import style from './TicketList.module.scss'

const TicketList = memo(() => {
  const dispatch = useDispatch()
  const { loading, error, data, displayedData } = useSelector((state) => {
    console.log('state > ', state)
    return state.reducerData
  })

  useEffect(() => {
    dispatch(fetchTickets())
  }, [dispatch])

  const handleShowMoreClick = () => {
    dispatch(ticketsShowMore(data))
  }
  console.log('displayedData > ', displayedData)

  if (loading) {
    return (
      <div className={style['loader--wrapper']}>
        <span className={style.loader} />
      </div>
    )
  }
  if (error) {
    return (
      <div className={style['loader--wrapper']}>
        <h1>Ошибка</h1>
      </div>
    )
  }

  return (
    <>
      <ul>
        {displayedData?.map((ticket) => {
          const { price, carrier, segments } = ticket
          const key = `${price}${carrier}${segments[0]?.date}`
          // console.log('ticket > ', ticket)

          return <TicketItem {...ticket} key={key} />
        })}
      </ul>
      <button
        className={style.button}
        onClick={handleShowMoreClick}
        type="button"
      >
        Показать еще 5 билетов!
      </button>
    </>
  )
})

export default TicketList

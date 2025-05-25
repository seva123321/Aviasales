import { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TicketItem from '@/components/TicketItem'
import fetchTickets from '@/store/asyncTickets'
import { ticketsShowMore } from '@/store/actions'

import style from './TicketList.module.scss'

const TicketList = memo(() => {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.loading)
  const error = useSelector((state) => state.error)
  const displayedData = useSelector((state) => state.displayedData)

  useEffect(() => {
    dispatch(fetchTickets())
  }, [dispatch])

  const handleShowMoreClick = () => {
    dispatch(ticketsShowMore())
  }

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
      {displayedData?.length ? (
        <ul>
          {displayedData?.map((ticket) => {
            const { price, carrier, segments } = ticket
            const key = `${price}${carrier}${segments[0]?.date}`

            return <TicketItem {...ticket} key={key} />
          })}
        </ul>
      ) : (
        <div className={style['loader--wrapper']}>
          Рейсов, подходящих под заданные фильтры, не найдено
        </div>
      )}
      {displayedData?.length > 0 && (
        <button
          className={style.button}
          onClick={handleShowMoreClick}
          type="button"
        >
          Показать еще 5 билетов!
        </button>
      )}
    </>
  )
})

export default TicketList

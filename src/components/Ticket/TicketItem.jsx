import style from './TicketItem.module.scss'

function TicketItem({ ...props }) {
  const { price, carrier } = props
  const flightDetails = [
    { title: 'MOW – HKT', value: price },
    { title: 'В пути', value: price },
    { title: '2 пересадки', value: price },
    { title: 'MOW – HKT', value: price },
    { title: 'В пути', value: price },
    { title: '1 пересадка', value: price },
  ]
  return (
    <li className={style.ticket}>
      <div className={style.ticket__header}>
        <span className={style.ticket__price}>{`${price} Р`}</span>
        <img
          src={`https://images.daisycon.io/airline/?width=99&height=36&iata=${carrier}`}
          alt={carrier}
        />
      </div>
      {flightDetails.map((detail, index) => (
        <dl
          className={style.cell}
          key={`${detail.title}${detail.value + index}`} // @TODO change + index}
        >
          <dt className={style.cell__title}>{detail.title}</dt>
          <dd className={style.cell__value}>{detail.value}</dd>
        </dl>
      ))}
    </li>
  )
}

export default TicketItem

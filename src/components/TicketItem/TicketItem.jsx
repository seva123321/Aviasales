import { IMG_PATH } from '@/service/constant'

import style from './TicketItem.module.scss'

function TicketItem({ ...props }) {
  const { price, carrier, segments } = props
  const {
    date: dateThere,
    destination: destinationThere,
    duration: durationThere,
    origin: originThere,
    stops: stopsThere,
  } = segments[0]
  const {
    date: dateBack,
    destination: destinationBack,
    duration: durationBack,
    origin: originBack,
    stops: stopsBack,
  } = segments[1]

  const getTextCountTransfer = (count) => {
    switch (count) {
      case 0:
        return 'без пересадок'
      case 1:
        return `${count} пересадка`
      case 2:
      case 3:
        return `${count} пересадки`
      default:
        return `${count} пересадок`
    }
  }

  const getTimeDuration = (time) => {
    const hours = Math.floor(time / 60)
    const minutes = time - hours * 60
    return `${hours} ч. ${minutes} мин.`
  }

  const getDateLocale = (date) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return new Date(date).toLocaleDateString('ru-Ru', options)
  }

  const flightDetails = [
    {
      title: `${originThere} – ${destinationThere}`,
      value: getDateLocale(dateThere),
    },
    {
      title: 'В пути',
      // value: durationThere,
      value: getTimeDuration(durationThere),
      // value: new Date(durationThere).toLocaleTimeString('ru-Ru', {
      //   hour: '2-digit',
      //   minute: '2-digit',
      // }),
    }, // @TODO timeCorrected
    {
      title: getTextCountTransfer(stopsThere.length),
      value: stopsThere.join(', '), // @TODO fixed
    },
    {
      title: `${originBack} – ${destinationBack}`,
      value: getDateLocale(dateBack),
    },
    {
      title: 'В пути',
      value: getTimeDuration(durationBack),
      // value: durationBack,
      // value: new Date(durationBack).toLocaleTimeString('ru-Ru', {
      //   hour: '2-digit',
      //   minute: '2-digit',
      // }),
    }, // @TODO timeCorrected
    {
      title: getTextCountTransfer(stopsBack.length),
      value: stopsBack.join(', '), // @TODO fixed
    },
  ]
  return (
    <li className={style.ticket}>
      <div className={style.ticket__header}>
        <span className={style.ticket__price}>{`${price} Р`}</span>
        <img src={`${IMG_PATH}${carrier}`} alt={carrier} />
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

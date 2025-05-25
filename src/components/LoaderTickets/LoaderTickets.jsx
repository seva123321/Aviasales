import { useSelector } from 'react-redux'

import style from './LoaderTickets.module.scss'

function LoaderTickets() {
  const allLoaded = useSelector((state) => state.allLoaded)

  return <div>{!allLoaded && <span className={style.loaderTickets} />}</div>
}

export default LoaderTickets

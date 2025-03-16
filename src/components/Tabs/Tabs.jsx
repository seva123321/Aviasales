import classNames from 'classnames'
import { useDispatch } from 'react-redux'
// import { useDispatch, useSelector } from 'react-redux'

import { sortCheapest, sortFastest, sortOptimal } from '../../store/actions'

import style from './Tabs.module.scss'

function Tabs() {
  const dispatch = useDispatch()
  // const data = useSelector((state) => {
  //   // console.log('Tabs state > ', state.reducerSorter)
  // })

  const handleClickCheap = () => {
    dispatch(sortCheapest())
  }
  const handleClickFast = () => {
    dispatch(sortFastest())
  }
  const handleClickOpt = () => {
    dispatch(sortOptimal())
  }

  return (
    <ul className={style.tabs}>
      <li className={style.tabs__item}>
        <button
          type="button"
          onClick={handleClickCheap}
          className={classNames(style.tabs__btn, { [style.active]: true })}
        >
          Самый дешевый
        </button>
      </li>
      <li className={style.tabs__item}>
        <button
          type="button"
          onClick={handleClickFast}
          className={style.tabs__btn}
        >
          Самый быстрый
        </button>
      </li>
      <li className={style.tabs__item}>
        <button
          type="button"
          onClick={handleClickOpt}
          className={style.tabs__btn}
        >
          Оптимальный
        </button>
      </li>
    </ul>
  )
}

export default Tabs

/*
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'

import { sortCheapest, sortFastest, sortOptimal } from '../../store/actions'

import style from './Tabs.module.scss'

function Tabs() {
  const dispatch = useDispatch()
  const activeSort = useSelector((state) =>
    state.reducerSorter.variant)
  // Предполагаем, что у вас есть поле variant в состоянии

  const handleClickCheap = () => {
    dispatch(sortCheapest())
  }
  const handleClickFast = () => {
    dispatch(sortFastest())
  }
  const handleClickOpt = () => {
    dispatch(sortOptimal())
  }

  return (
    <ul className={style.tabs}>
      <li>
        <button
          className={classNames(style.tabs__item, {
            [style.active]: activeSort === 'CHEAPEST',
          })}
          onClick={handleClickCheap}
        >
          Самый дешевый
        </button>
      </li>
      <li>
        <button
          className={classNames(style.tabs__item, {
            [style.active]: activeSort === 'FASTEST',
          })}
          onClick={handleClickFast}
        >
          Самый быстрый
        </button>
      </li>
      <li>
        <button
          className={classNames(style.tabs__item, {
            [style.active]: activeSort === 'OPTIMAL',
          })}
          onClick={handleClickOpt}
        >
          Оптимальный
        </button>
      </li>
    </ul>
  )
}

export default Tabs

*/

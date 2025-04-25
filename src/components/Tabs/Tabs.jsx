import { useState } from 'react'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
// import { useDispatch, useSelector } from 'react-redux'

import { sortCheapest, sortFastest, sortOptimal } from '../../store/actions'

import style from './Tabs.module.scss'

function Tabs() {
  const [activeButton, setActiveButton] = useState('btn-cheap')
  const dispatch = useDispatch()
  // const data = useSelector((state) => {
  //   // console.log('Tabs state > ', state.reducerSorter)
  // })
  const { data } = useSelector((state) => state.reducerData)

  const handleClickCheap = () => {
    dispatch(sortCheapest(data))
    setActiveButton('btn-cheap')
  }
  const handleClickFast = () => {
    dispatch(sortFastest(data))
    setActiveButton('btn-fast')
  }
  const handleClickOpt = () => {
    dispatch(sortOptimal(data))
    setActiveButton('btn-opt')
  }

  return (
    <ul className={style.tabs}>
      <li className={style.tabs__item}>
        <button
          id="btn-cheap"
          type="button"
          onClick={handleClickCheap}
          className={classNames(style.tabs__btn, {
            [style.active]: activeButton === 'btn-cheap',
          })}
        >
          Самый дешевый
        </button>
      </li>
      <li className={style.tabs__item}>
        <button
          id="btn-fast"
          type="button"
          onClick={handleClickFast}
          className={classNames(style.tabs__btn, {
            [style.active]: activeButton === 'btn-fast',
          })}
        >
          Самый быстрый
        </button>
      </li>
      <li className={style.tabs__item}>
        <button
          id="btn-opt"
          type="button"
          onClick={handleClickOpt}
          className={classNames(style.tabs__btn, {
            [style.active]: activeButton === 'btn-opt',
          })}
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

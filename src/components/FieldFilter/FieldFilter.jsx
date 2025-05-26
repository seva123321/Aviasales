import { useDispatch, useSelector } from 'react-redux'

import {
  filterAll,
  filterWithout,
  filterOneTransfer,
  filterTwoTransfer,
  filterThreeTransfer,
} from '@/store/reducersToolkit'

import style from './FieldFilter.module.scss'

function FieldFilter() {
  const dispatch = useDispatch()
  const checkboxState = useSelector((state) => state.filter)

  return (
    <div className={style.fields}>
      <h3 className={style.fields__header}>Количество пересадок</h3>
      <ul className={style.fields__list}>
        <li className={style.fields__item}>
          <label htmlFor="all-check">
            <input
              id="all-check"
              type="checkbox"
              name="all"
              className={style.fields__checkInput}
              checked={checkboxState.all}
              onChange={() => dispatch(filterAll())}
            />
            <span className={style.fields__checkbox} />
            Все
          </label>
        </li>
        <li className={style.fields__item}>
          <label htmlFor="without-check">
            <input
              id="without-check"
              type="checkbox"
              name="without"
              className={style.fields__checkInput}
              checked={checkboxState.without}
              onChange={() => dispatch(filterWithout())}
            />
            <span className={style.fields__checkbox} />
            Без пересадок
          </label>
        </li>
        <li className={style.fields__item}>
          <label htmlFor="oneTransfer-check">
            <input
              id="oneTransfer-check"
              type="checkbox"
              name="oneTransfer"
              className={style.fields__checkInput}
              checked={checkboxState.one}
              onChange={() => dispatch(filterOneTransfer())}
            />
            <span className={style.fields__checkbox} />
            <span>1 пересадка</span>
          </label>
        </li>
        <li className={style.fields__item}>
          <label htmlFor="twoTransfer-check">
            <input
              id="twoTransfer-check"
              type="checkbox"
              name="twoTransfer"
              className={style.fields__checkInput}
              checked={checkboxState.two}
              onChange={() => dispatch(filterTwoTransfer())}
            />
            <span className={style.fields__checkbox} />
            <span>2 пересадки</span>
          </label>
        </li>
        <li className={style.fields__item}>
          <label htmlFor="threeTransfer-check">
            <input
              id="threeTransfer-check"
              type="checkbox"
              name="threeTransfer"
              className={style.fields__checkInput}
              checked={checkboxState.three}
              onChange={() => dispatch(filterThreeTransfer())}
            />
            <span className={style.fields__checkbox} />
            <span>3 пересадки</span>
          </label>
        </li>
      </ul>
    </div>
  )
}

export default FieldFilter

import style from './FieldFilter.module.scss'

function FieldFilter() {
  return (
    <div className={style.fields}>
      <h3 className={style.fields__header}>Количество пересадок</h3>
      <ul className={style.fields__list}>
        <li className={style.fields__item}>
          <label htmlFor="all-check">
            <input
              id="all-check"
              type="checkbox"
              name=""
              className={style.fields__checkinput}
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
              name=""
              className={style.fields__checkinput}
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
              name=""
              className={style.fields__checkinput}
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
              name=""
              className={style.fields__checkinput}
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
              name=""
              className={style.fields__checkinput}
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

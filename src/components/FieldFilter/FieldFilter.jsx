import style from './FieldFilter.module.scss'

const FieldFilter = () => {
  return (
    <div className={style.fields}>
      <h3 className={style.fields__header}>Количество пересадок</h3>
      <ul className={style.fields__list}>
        <li className={style.fields__item}>
          <label>
            <input
              type="checkbox"
              name=""
              className={style.fields__checkinput}
            />
            <span className={style.fields__checkbox} />
            Все
          </label>
        </li>
        <li className={style.fields__item}>
          <label>
            <input
              type="checkbox"
              name=""
              className={style.fields__checkinput}
            />
            <span className={style.fields__checkbox} />
            Без пересадок
          </label>
        </li>
        <li className={style.fields__item}>
          <label>
            <input
              type="checkbox"
              name=""
              className={style.fields__checkinput}
            />
            <span className={style.fields__checkbox} />1 пересадка
          </label>
        </li>
        <li className={style.fields__item}>
          <label>
            <input
              type="checkbox"
              name=""
              className={style.fields__checkinput}
            />
            <span className={style.fields__checkbox} />2 пересадки
          </label>
        </li>
        <li className={style.fields__item}>
          <label>
            <input
              type="checkbox"
              name=""
              className={style.fields__checkinput}
            />
            <span className={style.fields__checkbox} />3 пересадки
          </label>
        </li>
      </ul>
    </div>
  )
}

export default FieldFilter

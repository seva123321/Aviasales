import classNames from 'classnames'

import style from './Tabs.module.scss'

function Tabs() {
  return (
    <ul className={style.tabs}>
      <li className={classNames(style.tabs__item, { [style.active]: true })}>
        Самый дешевый
      </li>
      <li className={style.tabs__item}>Самый быстрый</li>
      <li className={style.tabs__item}>Оптимальный</li>
    </ul>
  )
}

export default Tabs

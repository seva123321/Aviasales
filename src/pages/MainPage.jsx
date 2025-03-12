import { Fragment } from 'react'

import FieldFilter from '@/components/FieldFilter'
import Tabs from '@/components/Tabs'
import TicketList from '@/components/TicketList/TicketList'
import logoPlane from '@/public/logoPlane.png'

import style from './MainPage.module.scss'

function MainPage() {
  return (
    <>
      <div>
        <img
          src={logoPlane}
          alt="логотип самолет"
          style={{
            margin: '0 auto',
            display: 'block',
            width: '80px',
            height: '85px',
          }}
        />
        {/* <img src="@/public/logoPlane.png" alt="логотип самолет" /> */}
      </div>
      <div className={style.wrapper}>
        <FieldFilter />
        <div>
          <Tabs />
          <TicketList />
        </div>
      </div>
    </>
  )
}

export default MainPage

import { configureStore } from '@reduxjs/toolkit'

import reducer from './reducers'

export default configureStore({
  reducer,
  devTools: import.meta.env.VITE_MODE !== 'production',
})

import { configureStore } from '@reduxjs/toolkit'

import reducer from './reducersToolkit'

export default configureStore({
  reducer,
  devTools: import.meta.env.VITE_MODE !== 'production',
})

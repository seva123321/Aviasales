import { configureStore } from '@reduxjs/toolkit'

import { reducer, loggerMiddleWare } from './reducers'

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    getDefaultMiddleware().concat(loggerMiddleWare),
  // devTools: process.env.NODE_ENV !== 'production',
})

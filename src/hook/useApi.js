import { useContext } from 'react'

import ApiContext from '../service/Context'

const useApi = () => useContext(ApiContext)

export default useApi

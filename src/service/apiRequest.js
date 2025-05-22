import { BASE_URL } from '@/service/constant'

class ApiRequest {
  #baseURL = BASE_URL

  async #getData(url) {
    const res = await fetch(url)

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(JSON.stringify(errorData))
    }

    this.resource = await res.json()
    return this.resource
  }

  async getSearchId() {
    if (localStorage.getItem('searchId')) {
      return localStorage.getItem('searchId')
    }

    const url = new URL('search', this.#baseURL)
    const result = await this.#getData(url)
    const { searchId } = result
    localStorage.setItem('searchId', searchId)

    return searchId
  }

  async getTickets(searchId) {
    if (!searchId) throw new Error('Invalid searchId')
    const url = new URL('tickets', this.#baseURL)
    url.searchParams.set('searchId', searchId)

    const result = await this.#getData(url)
    localStorage.removeItem('searchId')
    return result
  }
}

export default ApiRequest

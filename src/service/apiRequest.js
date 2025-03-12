class apiRequest {
  #baseURL = 'https://aviasales-test-api.kata.academy'

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
    const url = new URL('search', this.#baseURL)
    const result = await this.#getData(url)

    return result
  }

  async getTickets(searchId) {
    const url = new URL('tickets', this.#baseURL)
    url.searchParams.set('searchId', searchId)

    const result = await this.#getData(url)

    return result
  }
}

export default apiRequest

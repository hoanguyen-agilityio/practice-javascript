class ApiService {
  /**
   * Get by calling API
   * 
   * @param {*} url - link to the database
   */
  async get(url) {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 
      },
    });

    const data = await response.json();
    return data;
  }
}

const apiService = new ApiService();

export { apiService };

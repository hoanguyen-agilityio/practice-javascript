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

    return await response.json();
  }

  /**
   *  Create new by calling API
   * 
   * @param {*} url - link to the database
   * @param {*} data - Data updated to database
   */
  async post(url, data) {
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, option);

    return response.json();
  }

  /**
   * Update by calling API
   * 
   * @param {*} url - link to the database
   * @param {*} data - Data updated to database
   * @returns 
   */
  async put(url, data) {
    const option = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, option);

    return response.json();
  }
}

const apiService = new ApiService();

export { apiService };

// Import variable STUDENT_API from url-api.constant
import { STUDENT_API } from '../constants/url-api.constant';

// Import class apiService from api.service
import { apiService } from './api.service';

export class StudentService {
  /**
   * Get all data from database
   */
  static async getAll() {
    return await apiService.get(STUDENT_API);
  }

  /**
   * Add new student in database
   * 
   * @param {*} data - The object contains the information of the student
   */
  static async post(data) {
    return await apiService.post(STUDENT_API, data);
  }

  /**
   * Get student by id in database
   *
   * @param {number} id - Id of the student in the database
   */
  static async getById(id) {
    return await apiService.get(`${STUDENT_API}/${id}`);
  }

  /**
   * Update movie in database
   *
   * @param {number} id - Id of the movie in the database
   * @param {string} data - The object contains the information of the movie
   */
    static async update(id, data) {
      return apiService.put(`${STUDENT_API}/${id}`, data);
    }
}

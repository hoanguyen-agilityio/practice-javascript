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
   * @returns 
   */
  static async post(data) {
    return await apiService.post(STUDENT_API, data);
  }
}

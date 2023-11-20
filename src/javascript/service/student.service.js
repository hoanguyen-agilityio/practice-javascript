import { STUDENT_API } from '../constants/url-api.constant';
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

// Constants
import { STUDENT_API } from '@/constant';

// Import class apiService from api.service
import { apiService } from './api.service';
import { Student } from '../interfaces/student.interfaces';

export class StudentService {
  /**
   * Get all data from database
   */
  static async getAll() {
    return await apiService.get<Student>(STUDENT_API);
  }

  /**
   * Add new student in database
   * 
   * @param {*} data - The object contains the information of the student
   */
  static async post(data: Student[]) {
    return await apiService.post<Student>(STUDENT_API, data);
  }

  /**
   * Get student by id in database
   *
   * @param {string} id - Id of the student in the database
   */
  static async getById(id: string) {
    return await apiService.get<Student>(`${STUDENT_API}/${id}`);
  }

  /**
   * Update student in database
   *
   * @param {string} id - Id of the student in the database
   * @param {string} data - The object contains the information of the student
   */
    static async update(id: string, data: Student[]) {
      return await apiService.put<Student>(`${STUDENT_API}/${id}`, data);
    }

  /**
   * Remove student from database
   *
   * @param {string} id - Id of the student in the database
   */
  static async delete(id: string) {
    return await apiService.delete<Student>(`${STUDENT_API}/${id}`);
  }
}

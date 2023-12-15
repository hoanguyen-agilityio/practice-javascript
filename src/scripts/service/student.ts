// Constants
import { STUDENT_API } from '@/constant';

// Import class apiService from api.service
import { apiService } from '@/service';
import { PartialStudent } from '@/interface';

export class StudentService {
  /**
   * Get all data from database
   */
  static async getAll(): Promise<PartialStudent[]> {
    return await apiService.get<PartialStudent[]>(STUDENT_API);
  }

  /**
   * Add new student in database
   *
   * @param {*} data - The object contains the information of the student
   */
  static async post(data: PartialStudent): Promise<PartialStudent> {
    return await apiService.post<PartialStudent>(STUDENT_API, data);
  }

  /**
   * Get student by id in database
   *
   * @param {string} id - Id of the student in the database
   */
  static async getById(id: string): Promise<PartialStudent> {
    return await apiService.get<PartialStudent>(`${STUDENT_API}/${id}`);
  }

  /**
   * Update student in database
   *
   * @param {string} id - Id of the student in the database
   * @param {string} data - The object contains the information of the student
   */
    static async update(id: string, data: PartialStudent): Promise<PartialStudent> {
      return await apiService.put<PartialStudent>(`${STUDENT_API}/${id}`, data);
    }

  /**
   * Remove student from database
   *
   * @param {string} id - Id of the student in the database
   */
  static async delete(id: string): Promise<PartialStudent> {
    return await apiService.delete<PartialStudent>(`${STUDENT_API}/${id}`);
  }
}

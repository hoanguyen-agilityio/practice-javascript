import { STUDENT_API } from '../constants/url-api.constant';
import { apiService } from './api.service';

export class StudentService {
    static async getAll() {
        return await apiService.get(STUDENT_API);
    }
}

import { ACCOUNTS_API } from '../constants/url-api.constant'
import { apiService } from './api.service'

export class AccountService {
   async getLoginUser() {
    const response = await apiService.get(ACCOUNTS_API);
    console.log(response)
    return response;
  }
}

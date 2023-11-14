import { STUDENTS_LIST_PAGE } from '../constants/app.constant';
import { ACCOUNTS_API } from '../constants/url-api.constant'
import { apiService } from '../service/api.service'
import { formValidate } from '../validates/form.validate';
import { DocumentHelper } from '../helpers/document.helper';
import { MESSAGES, EMPTY_TEXT } from '../constants/message.constant';

export class Login {
  loginBtn = document.getElementById('loginBtn');
  emailInput = document.getElementById('email');
  passwordInput = document.getElementById('password');
  errorMessage = document.querySelector('.error-message')

  constructor() {
    this.addLoginEvent();
  }

  async login() {
    const data = {
      email: this.emailInput.value,
      password: this.passwordInput.value,
    }

    if (formValidate.isEmpty) {
      DocumentHelper.showErrorMessage(this.errorMessage, MESSAGES.empty)

      return;
    }

    if (formValidate.isValidEmail(data.email)) {
      DocumentHelper.showErrorMessage(this.errorMessage, MESSAGES.emailWrongFormat)

      return;
    }
    

    try {
      const userList = await apiService.get(ACCOUNTS_API);
      const user = userList.find(({ email }) => email === data.email);   
      
      // Incorrect Login Account
      if(user.length === 0) {
        DocumentHelper.showErrorMessage(
          this.generalWarnMsg,
          MESSAGES.incorrectLoginAccount,
        );
        DocumentHelper.showErrorMessage(this.emailInput, EMPTY_TEXT);
        DocumentHelper.showErrorMessage(this.passwordInput, EMPTY_TEXT);

        return;
      } 
      
      if (user.email === data.email && user.password === data.password) {
        window.location.href = STUDENTS_LIST_PAGE
      } else {
        DocumentHelper.showErrorMessage(this.errorMessage, MESSAGES.empty)
      }
    } 
    catch (error) {
      DocumentHelper.showErrorMessage(this.errorMessage, MESSAGES.incorrectLoginAccount);
    }
  }

  addLoginEvent() {
    this.loginBtn.addEventListener('click', async () => {
      await this.login();
    });
  }
}

// Import variable STUDENTS_LIST_PAGE from app.constant
import { STUDENTS_LIST_PAGE } from '../constants/app.constant';

// Import variable ACCOUNTS_API from url-api.constant
import { ACCOUNTS_API } from '../constants/url-api.constant';

// Import class apiService from api.service
import { apiService } from '../service/api.service';

// Import class validate from form.validate
import { validate } from '../validates/form.validate';

// Import class DocumentHelper from document.helper
import { DocumentHelper } from '../helpers/document.helper';

// Import variable MESSAGES, EMPTY_TEXT from message.constant
import { MESSAGES, EMPTY_TEXT } from '../constants/message.constant';

export class Login {
  formlogin = document.querySelector('#formlogin');
  loginBtn = formlogin.querySelector('#btnlogin');
  emailInput = formlogin.querySelector('#email');
  passwordInput = formlogin.querySelector('#password');
  errorMessage = formlogin.querySelector('.error-message');
  errorMessageEmailLogin = formlogin.querySelector('.error-message-email-login');
  errorMessagePassword = formlogin.querySelector('.error-message-password');

  constructor() {
    this.addLoginEvent();
  }

  async login() {
    const data = {
      email: this.emailInput.value,
      password: this.passwordInput.value,
    };
    const config = {
      email: ['empty','formatEmail'],
      password: ['empty','passwordRule'],
    };
    const validation = validate.validateForm(data, config);

    // If the input is empty, an error message will be output
    if (!validation.isValid) {
      DocumentHelper.showErrorMessage(this.emailInput, validation.errors.email);
      DocumentHelper.showErrorMessage(this.passwordInput, validation.errors.password);
      DocumentHelper.showErrorMessage(this.errorMessage, EMPTY_TEXT);

      return;
    }

    try {
      const userList = await apiService.get(ACCOUNTS_API);
      const user = userList.find(({ email }) => email === data.email);   
      
      // Correct login account      
      if (user.email === data.email && user.password === data.password) {
        window.location.href = STUDENTS_LIST_PAGE;
        DocumentHelper.showErrorMessage(this.errorMessage, EMPTY_TEXT);
        DocumentHelper.showErrorMessage(this.errorMessageEmailLogin, EMPTY_TEXT);
        DocumentHelper.showErrorMessage(this.errorMessagePassword, EMPTY_TEXT);

      // Login with the wrong account
      } else {
        DocumentHelper.showErrorMessage(this.errorMessage, MESSAGES.INCORRECT_LOGIN_ACCOUNT);
        DocumentHelper.showErrorMessage(this.errorMessageEmailLogin, EMPTY_TEXT);
        DocumentHelper.showErrorMessage(this.errorMessagePassword, EMPTY_TEXT);

        return;
      }
    } catch (error) {
      DocumentHelper.showErrorMessage(this.errorMessage, MESSAGES.GET_ACCOUNT_ERR);

      return;
    }
  }

  addLoginEvent() {
    this.loginBtn.addEventListener('click', async () => {
      await this.login();
    });
  }
}

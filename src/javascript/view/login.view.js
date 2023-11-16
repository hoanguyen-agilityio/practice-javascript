import { STUDENTS_LIST_PAGE } from '../constants/app.constant';
import { ACCOUNTS_API } from '../constants/url-api.constant'
import { apiService } from '../service/api.service'
import { validate } from '../validates/form.validate';
import { DocumentHelper } from '../helpers/document.helper';
import { MESSAGES, EMPTY_TEXT } from '../constants/message.constant';

export class Login {
  formLogin = document.querySelector('#formLogin');
  loginBtn = formLogin.querySelector('#loginBtn');
  emailInput = formLogin.querySelector('#email');
  passwordInput = formLogin.querySelector('#password');
  errorMessage = formLogin.querySelector('.error-message');
  errorMessageEmailLogin = formLogin.querySelector('.error-message-email-login');
  errorMessagePassword = formLogin.querySelector('.error-message-password');

  constructor() {
    this.addLoginEvent();
  }

  async login() {
    const data = {
      email: this.emailInput.value,
      password: this.passwordInput.value,
    };
    const config = {
      email: [ 'empty', 'formatEmail' ],
      password: ['empty', 'passwordRule' ],
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

      // Login with the wrong account
      } else {
        DocumentHelper.showErrorMessage(this.errorMessage, MESSAGES.incorrectLoginAccount);
        DocumentHelper.showErrorMessage(this.errorMessageEmailLogin, EMPTY_TEXT);
        DocumentHelper.showErrorMessage(this.errorMessagePassword, EMPTY_TEXT);

        return;
      }
    } catch (error) {
      DocumentHelper.showErrorMessage(this.errorMessage, MESSAGES.incorrectLoginAccount);

      return;
    }
  }

  addLoginEvent() {
    this.loginBtn.addEventListener('click', async () => {
      await this.login();
    });
  }
}

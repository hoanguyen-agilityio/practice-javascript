// Constants
import {
  STUDENTS_LIST_PAGE,
  ACCOUNTS_API,
  MESSAGES,
} from '@/constants';

// Service
import { apiService } from '../services';

// Validates
import { validate } from '@/validates';

// Helpers
import {
  DocumentHelper,
  LoaderHelper
} from '@/helpers';

// Interfaces
import {
  PartialConfigValidation,
  PartialUser
} from '@/interfaces';

export class Login {
  formLogin = document.querySelector('#formlogin');
  loginBtn = this.formLogin.querySelector('#btnlogin');
  emailInput = this.formLogin.querySelector('input[name="email"]') as HTMLInputElement;
  passwordInput = this.formLogin.querySelector('input[name="password"]') as HTMLInputElement;
  errorMessage = this.formLogin.querySelector('.error-message');
  errorMessageEmailLogin = this.formLogin.querySelector('.error-message-email-login');
  errorMessagePassword = this.formLogin.querySelector('.error-message-password');
  containerLoader = document.querySelector('.container-loader');

  constructor() {
    this.addLoginEvent();
  }

	/**
	 * Clean error message
	 */
	cleanErrorMessage() {
		DocumentHelper.cleanErrorMessage(this.errorMessage);
 }

  async login(): Promise<void> {
    const data: PartialUser = {
      email: this.emailInput.value,
      password: this.passwordInput.value,
    };
    const config: PartialConfigValidation = {
      email: ['emptyEmail','formatEmail'],
      password: ['emptyPassword','passwordRule'],
    };

    const validation = validate.validateForm(data, config);

    // If the input is empty, an error message will be output
    if (!validation.isValid) {
      DocumentHelper.showErrorMessage(this.emailInput, validation.errors.email);
      DocumentHelper.showErrorMessage(this.passwordInput, validation.errors.password);

      return;
    }

    try {
      const userList = await apiService.get<PartialUser[]>(ACCOUNTS_API);
      const user = userList.find(({ email }) => email === data.email);
      // Clear error messages
      this.cleanErrorMessage();

      // Correct login account
      if (user.email === data.email && user.password === data.password) {
        LoaderHelper.showLoader(this.containerLoader);
        setTimeout(() => {window.location.href = STUDENTS_LIST_PAGE;}, 3000);


      // Login with the wrong account
      } else {
        DocumentHelper.showErrorMessage(this.errorMessage, MESSAGES.INCORRECT_LOGIN_ACCOUNT);

        return;
      }
    } catch (error) {
      DocumentHelper.showErrorMessage(this.errorMessage, MESSAGES.GET_ACCOUNT_ERR);

      return;
    }
  }

  addLoginEvent(): void {
    this.loginBtn.addEventListener('click', async () => {
      await this.login();
    });
  }
}

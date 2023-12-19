// Constants
import {
  STUDENTS_LIST_PAGE,
  ACCOUNTS_API,
  MESSAGES,
  EMPTY_TEXT
} from '@/constant';

// Service
import { apiService } from '@/service';

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
  LoginAccount
} from '@/interface';

export class Login {
  formLogin = document.querySelector('#formlogin');
  loginBtn = this.formLogin.querySelector('#btnlogin');
  emailInput = this.formLogin.querySelector('#email') as HTMLInputElement;
  passwordInput = this.formLogin.querySelector('#password') as HTMLInputElement;
  errorMessage = this.formLogin.querySelector('.error-message') as HTMLElement;
  errorMessageEmailLogin = this.formLogin.querySelector('.error-message-email-login') as HTMLElement;
  errorMessagePassword = this.formLogin.querySelector('.error-message-password') as HTMLElement;
  containerLoader = document.querySelector('.container-loader') as HTMLElement;

  constructor() {
    this.addLoginEvent();
  }

	/**
	 * Clean error message
	 */
	cleanErrorMessage() {
		DocumentHelper.cleanErrorMessage(this.errorMessage);
		DocumentHelper.cleanErrorMessage(this.errorMessageEmailLogin);
		DocumentHelper.cleanErrorMessage(this.errorMessagePassword);
 }

  async login(): Promise<void> {
    const data: LoginAccount = {
      email: (this.emailInput as HTMLInputElement).value,
      password: (this.passwordInput as HTMLInputElement).value,
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
      DocumentHelper.showErrorMessage(this.errorMessage, EMPTY_TEXT);

      return;
    }

    try {
      const userList = await apiService.get<LoginAccount[]>(ACCOUNTS_API);
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

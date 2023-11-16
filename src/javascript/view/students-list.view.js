
import { LOGIN_PAGE } from "../constants/app.constant";

export class StudentsList {
  mainSidebar = document.querySelector('#mainsidebar');
  btnLogout = this.mainSidebar.querySelector('.btn-logout');

  constructor() {
    this.handleUserLogout()
  }

  /**
   * Handle logout when the user clicks the logout button
   */
  handleUserLogout() {
    this.btnLogout.addEventListener('click', () => {
      window.location.href = LOGIN_PAGE
    })
  }
}

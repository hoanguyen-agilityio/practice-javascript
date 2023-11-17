
import { LOGIN_PAGE } from "../constants/app.constant";
import { StudentTemplate } from "../templates/student.template";
import { StudentService } from "../service/student.service";

export class StudentsList {
  mainSidebar = document.querySelector('#mainsidebar');
  btnLogout = this.mainSidebar.querySelector('.btn-logout');
  table = document.querySelector('.table');
  tableRow = this.table.querySelector('.table-row');

  constructor() {
    this.handleUserLogout()
    this.handleRenderTable()
  }

  async handleRenderTable() {
    try {
      const result = await StudentService.getAll();
      let tableTemplate = '';

      result.forEach((student) => {
        tableTemplate += StudentTemplate.renderTableRow(student);
      });

      this.tableRow.innerHTML = tableTemplate;
    } catch (error) {
      alert('An error occurred while getting student', error)
    }
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


import { LOGIN_PAGE } from '../constants/app.constant';
import { StudentTemplate } from '../templates/student.template';
import { StudentService } from '../service/student.service';
import { ModalHelper } from '../helpers/modal.helper';
import { DocumentHelper } from '../helpers/document.helper';

export class StudentsList {
  mainSidebar = document.querySelector('#mainsidebar');
  table = document.querySelector('.table');
  modalForm = document.querySelector('.modal-form');
  studentsListHeader = document.querySelector('.students-list-header');
  btnLogout = this.mainSidebar.querySelector('.btn-logout');
  tableRow = this.table.querySelector('.table-row');
  btnShowFormAddStudent = this.studentsListHeader.querySelector('.btn-add-student');
  btnCancel = this.modalForm.querySelector('.btn-cancel');
  btnCreateStudent = this.modalForm.querySelector('.btn-create-student');
  btnUpdateStudent = this.modalForm.querySelector('.btn-update-student');

  constructor() {
    this.handleUserLogout();
    this.showFormAddNewStudent();
    this.cancelModalForm();
    this.handleRenderTable();
  }

  /**
   * Handling getting data from the API and displaying it on a table in HTML
   */
  async handleRenderTable() {
    try {
      const result = await StudentService.getAll();
      let tableTemplate = '';

      result.forEach((student) => {
        tableTemplate += StudentTemplate.renderTableRow(student);
      });

      this.tableRow.innerHTML = tableTemplate;
    } catch (error) {
      alert('An error occurred while getting student', error);
    }
  }

  /**
   * Handle the event when clicking on the add student button, the add student form will appear
   */
  showFormAddNewStudent() {
    this.btnShowFormAddStudent.addEventListener('click', () => {
      ModalHelper.showModal(this.modalForm);
      DocumentHelper.hideElement(this.btnUpdateStudent);
      DocumentHelper.showElement(this.btnCreateStudent);
    });
  }

  /**
   * Handle the event when the user clicks on the cancel button, the form will be hidden
   */
  cancelModalForm() {
    this.btnCancel.addEventListener('click', () => {
      ModalHelper.hideModal(this.modalForm);
    })
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

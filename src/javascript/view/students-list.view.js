
import { LOGIN_PAGE } from '../constants/app.constant';
import { StudentTemplate } from '../templates/student.template';
import { StudentService } from '../service/student.service';
import { ModalHelper } from '../helpers/modal.helper';
import { DocumentHelper } from '../helpers/document.helper';
import { validate } from '../validates/form.validate';
import { log } from 'util';

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
  nameStudent = this.modalForm.querySelector('#namestudent');
  emailStudent = this.modalForm.querySelector('#email');
  phoneStudent = this.modalForm.querySelector('#phone');
  phoneEnrollNumberStudent = this.modalForm.querySelector('#phoneenrollnumber');
  dateOfAdmission = this.modalForm.querySelector('#dateofadmission');
  form = this.modalForm.querySelector('.form');

  constructor() {
    this.handleUserLogout();
    this.showFormAddNewStudent();
    this.addEventForCreateButton();
    this.cancelModalForm();
    this.handleRenderTable();
  }

  // Reset input and error message
  resetForm() {
    this.form.reset();
    DocumentHelper.cleanErrorMessage(this.nameStudent);
    DocumentHelper.cleanErrorMessage(this.emailStudent);
    DocumentHelper.cleanErrorMessage(this.phoneStudent);
    DocumentHelper.cleanErrorMessage(this.phoneEnrollNumberStudent);
    DocumentHelper.cleanErrorMessage(this.dateOfAdmission);
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
   * Handling create form  by calling API
   */
  async handleAddForm() {
    try {
      const data = {
        nameStudent: this.nameStudent.value,
        email: this.emailStudent.value,
        phone: this.phoneStudent.value,
        phoneEnrollNumber: this.phoneEnrollNumberStudent.value,
        dateOfAdmission: this.dateOfAdmission.value,
      };
      const config = {
        nameStudent: ['empty', 'nameRule'],
        email: ['empty', 'formatEmail'],
        phone: ['empty', 'numberPhoneRule'],
        // phoneEnrollNumber: ['empty'],
        dateOfAdmission: ['empty']
      };
      const validation = validate.validateForm(data, config);
  
      if (!validation.isValid) {
        DocumentHelper.showErrorMessage(this.nameStudent, validation.errors.nameStudent);
        DocumentHelper.showErrorMessage(this.emailStudent, validation.errors.email);
        DocumentHelper.showErrorMessage(this.phoneStudent, validation.errors.phone);
        // DocumentHelper.showErrorMessage(this.phoneEnrollNumberStudent, validation.errors.phoneEnrollNumber);
        DocumentHelper.showErrorMessage(this.dateOfAdmission, validation.errors.dateOfAdmission);
  
        return;
      } else {
        const newStudent = await StudentService.post(data);
        console.log(newStudent)
        const newRow = this.tableRow.insertRow();

        newRow.className = 'content-row';
        newRow.setAttribute('data-id', newStudent.id);
        ModalHelper.hideModal(this.modalForm);
      }

    } catch (error) {
      alert('An error occurred while creating a new student', error)
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

  addEventForCreateButton() {
    // New student will be created when clicking create button
    this.btnCreateStudent.addEventListener('click', async () => {
      await this.handleAddForm();
    });
  }

  /**
   * Handle the event when the user clicks on the cancel button, the form will be hidden
   */
  cancelModalForm() {
    this.btnCancel.addEventListener('click', () => {
      ModalHelper.hideModal(this.modalForm);
      this.resetForm();
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

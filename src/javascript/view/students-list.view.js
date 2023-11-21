// Import variable LOGIN_PAGE from file app.constant
import { LOGIN_PAGE } from '../constants/app.constant';

// Templates
import { StudentTemplate } from '../templates/student.template';

// Service
import { StudentService } from '../service/student.service';

// Helpers
import { ModalHelper } from '../helpers/modal.helper';
import { DocumentHelper } from '../helpers/document.helper';

// Validates
import { validate } from '../validates/form.validate';

export class StudentsList {
  mainSidebar = document.querySelector('#mainsidebar');
  table = document.querySelector('.table');
  modal = document.querySelector('.modal-form');
  studentsHeading = document.querySelector('.students-list-header');
  btnLogout = this.mainSidebar.querySelector('.btn-logout');
  tableRow = this.table.querySelector('.table-row');
  btnShowFormAddStudent = this.studentsHeading.querySelector('.btn-add-student');
  btnCancel = this.modal.querySelector('.btn-cancel');
  btnCreateStudent = this.modal.querySelector('.btn-create-student');
  btnUpdateStudent = this.modal.querySelector('.btn-update-student');
  name = this.modal.querySelector('#namestudent');
  email = this.modal.querySelector('#email');
  phone = this.modal.querySelector('#phone');
  enrollNumber = this.modal.querySelector('#phoneenrollnumber');
  dateOfAdmission = this.modal.querySelector('#dateofadmission');
  form = this.modal.querySelector('.form');

  constructor() {
    this.handleUserLogout();
    this.showFormAddNewStudent();
    this.addEventForCreateButton();
    this.cancelModal();
    this.handleRenderTable();
  }

  // Reset input and error message
  resetForm() {
    this.form.reset();
    DocumentHelper.cleanErrorMessage(this.name);
    DocumentHelper.cleanErrorMessage(this.email);
    DocumentHelper.cleanErrorMessage(this.phone);
    DocumentHelper.cleanErrorMessage(this.enrollNumber);
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
        name: this.name.value,
        email: this.email.value,
        phone: this.phone.value,
        enrollnumber: this.enrollNumber.value,
        dateofadmission: this.dateOfAdmission.value,
      };
      const config = {
        name: ['empty', 'nameRule'],
        email: ['empty', 'formatEmail'],
        phone: ['empty', 'phoneRule'],
        enrollnumber: ['empty', 'phoneRule'],
        dateofadmission: ['empty']
      };
      const validation = validate.validateForm(data, config);
      
      // Check entry requirements of all schools. If incorrect, output an error message
      if (!validation.isValid) {
        DocumentHelper.showErrorMessage(this.name, validation.errors.name);
        DocumentHelper.showErrorMessage(this.email, validation.errors.email);
        DocumentHelper.showErrorMessage(this.phone, validation.errors.phone);
        DocumentHelper.showErrorMessage(this.enrollNumber, validation.errors.enrollnumber);
        DocumentHelper.showErrorMessage(this.dateOfAdmission, validation.errors.dateofadmission);
  
        return;
      } else {
        // Add newly created students to the database
        const newStudent = await StudentService.post(data);
        const newRow = this.tableRow.insertRow();
        const newHideRow = this.tableRow.insertRow();

        // Add class for new row
        newRow.className = 'content-row';

        newHideRow.className = 'spacer';

        // Set attribute for new row
        newRow.setAttribute('data-id', newStudent.id);

        // Display newly created students on the screen
        newRow.innerHTML = StudentTemplate.renderTableRow(newStudent);
        ModalHelper.hideModal(this.modal);
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
      ModalHelper.showModal(this.modal);
      DocumentHelper.hideElement(this.btnUpdateStudent);
      DocumentHelper.showElement(this.btnCreateStudent);
      this.resetForm();
    });
  }

  /**
   * Add event for create button
   */
  addEventForCreateButton() {
    // New student will be created when clicking create button
    this.btnCreateStudent.addEventListener('click', async () => {
      await this.handleAddForm();
    });
  }

  /**
   * Handle the event when the user clicks on the cancel button, the form will be hidden
   */
  cancelModal() {
    this.btnCancel.addEventListener('click', () => {
      ModalHelper.hideModal(this.modal);
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

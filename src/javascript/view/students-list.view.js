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
import { EMPTY_TEXT, MESSAGES } from '../constants/message.constant';

export class StudentsList {
  mainSidebar = document.querySelector('#mainsidebar');
  table = document.querySelector('.table');
  modal = document.querySelector('.modal-form');
  listHeading = document.querySelector('.list-heading');
  btnLogout = this.mainSidebar.querySelector('.btn-logout');
  tableRow = this.table.querySelector('.table-row');
  btnShowFormAddStudent = this.listHeading.querySelector('.btn-add-student');
  btnCancel = this.modal.querySelector('.btn-cancel');
  btnCreateStudent = this.modal.querySelector('.btn-create-student');
  btnUpdateStudent = this.modal.querySelector('.btn-update-student');
  name = this.modal.querySelector('#namestudent');
  email = this.modal.querySelector('#email');
  phone = this.modal.querySelector('#phone');
  enrollNumber = this.modal.querySelector('#phoneenrollnumber');
  dateOfAdmission = this.modal.querySelector('#dateofadmission');
  form = this.modal.querySelector('.form');
  dataInput = this.modal.querySelectorAll('.data-input');

  constructor() {
    this.handleLogout();
    this.handleShowAddForm();
    this.handleAddEventForCreateButton();
    this.handleAddEventForUpdateButton();
    this.handleCancelModal();
    this.handleRenderTable();
  }

  /**
   * Reset input and error message
   */
  resetForm() {
    this.dataInput.forEach((item) => {
      item.value = EMPTY_TEXT;
    })
    DocumentHelper.cleanErrorMessage(this.name);
    DocumentHelper.cleanErrorMessage(this.email);
    DocumentHelper.cleanErrorMessage(this.phone);
    DocumentHelper.cleanErrorMessage(this.enrollNumber);
    DocumentHelper.cleanErrorMessage(this.dateOfAdmission);
  }

  /**
   * Show student edit form
   * 
   * @param {*} item - Edit buttons
   */
  async showEditStudentModal(item) {
    const studentId = item.dataset.id;
    const studentData = await StudentService.getById(studentId);

    ModalHelper.showModal(this.modal);
    this.name.value = studentData.name;
    this.email.value = studentData.email;
    this.phone.value = studentData.phone;
    this.enrollNumber.value = studentData.enrollnumber;
    this.dateOfAdmission.value = studentData.dateofadmission;
    this.form.setAttribute('data-id', studentId);
  }

  /**
   * Handle the edit form that appears when clicking on the edit button
   */
  handleButtonsEdit() {
    const btnEdits = document.querySelectorAll('.table-row .btn-edit');

    // Filter through each edit button
    btnEdits.forEach((item) => {
      item.addEventListener('click', async () => {
        await this.showEditStudentModal(item);
        DocumentHelper.hideElement(this.btnCreateStudent);
        DocumentHelper.showElement(this.btnUpdateStudent);
      });
    });
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
      this.handleButtonsEdit();
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
        name: ['empty', 'name'],
        email: ['empty', 'formatEmail'],
        phone: ['empty', 'phone'],
        enrollnumber: ['empty', 'phone'],
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
        const hideRow = this.tableRow.insertRow();

        // Add class for new row
        newRow.className = 'content-row';

        // Add class for hide row
        hideRow.className = 'spacer';

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
   * Handling update form  by calling API
   */
  async handleUpdateForm() {
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
      const formStudentId = this.form.getAttribute('data-id');
      const studentsList = await StudentService.getAll();
      
      // Check entry requirements of all schools. If incorrect, output an error message
      if (!validation.isValid) {
        DocumentHelper.showErrorMessage(this.name, validation.errors.name);
        DocumentHelper.showErrorMessage(this.email, validation.errors.email);
        DocumentHelper.showErrorMessage(this.phone, validation.errors.phone);
        DocumentHelper.showErrorMessage(this.enrollNumber, validation.errors.enrollnumber);
        DocumentHelper.showErrorMessage(this.dateOfAdmission, validation.errors.dateofadmission);
  
        return;
      } else {
        const duplicateEmail = validate.checkDuplicateData(studentsList, 'email', data.email);
        const duplicatePhoneNumber = validate.checkDuplicateData(studentsList, 'phone', data.phone);
        const duplicateEnrollNumber = validate.checkDuplicateData(studentsList, 'enrollnumber', data.enrollnumber);
        let isContinue = true;

        // Checking for duplicate emails will produce an error message
        if (duplicateEmail) {
          isContinue = false;
          DocumentHelper.showErrorMessage(this.email, MESSAGES.DUPLICATE_EMAIL);
        }
        
        // If you check for duplicate phone numbers, an error message will appear
        if (duplicatePhoneNumber) {
          isContinue = false;
          DocumentHelper.showErrorMessage(this.phone, MESSAGES.DUPLICATE_PHONE);
        }

        // If you check for the same enrollment number, an error message will appear
        if (duplicateEnrollNumber) {
          isContinue = false;
          DocumentHelper.showErrorMessage(this.enrollNumber, MESSAGES.DUPLICATE_ENROLL_NUMBER);
        }
        if (!isContinue) {
          return;
        }

        const updateRow = document.querySelector(`[data-id="${formStudentId}"]`);
        const updateStudent = await StudentService.update(formStudentId, data);

        updateRow.innerHTML = StudentTemplate.renderTableRow(updateStudent);
        this.handleButtonsEdit();
        ModalHelper.hideModal(this.modal);
      }    
    } catch (error) {
      alert('Something went wrong while updating the student', error);
    }
  }

  /**
   * Handle the event when clicking on the add student button, the add student form will appear
   */
  handleShowAddForm() {
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
  handleAddEventForCreateButton() {
    // New student will be created when clicking create button
    this.btnCreateStudent.addEventListener('click', async () => {
      await this.handleAddForm();
    });
  }

  handleAddEventForUpdateButton() {
    // Movie will be updated when the update button is clicked
    this.btnUpdateStudent.addEventListener('click', async () => {
      await this.handleUpdateForm();
    });
  }

  /**
   * Handle the event when the user clicks on the cancel button, the form will be hidden
   */
  handleCancelModal() {
    this.btnCancel.addEventListener('click', () => {
      ModalHelper.hideModal(this.modal);
      this.resetForm();
    })
  }

  /**
   * Handle logout when the user clicks the logout button
   */
  handleLogout() {
    this.btnLogout.addEventListener('click', () => {
      window.location.href = LOGIN_PAGE
    })
  }
}

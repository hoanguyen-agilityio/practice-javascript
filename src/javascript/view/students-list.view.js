
import { LOGIN_PAGE } from '../constants/app.constant';
import { StudentTemplate } from '../templates/student.template';
import { StudentService } from '../service/student.service';
import { ModalHelper } from '../helpers/modal.helper';
import { DocumentHelper } from '../helpers/document.helper';
import { validate } from '../validates/form.validate';
import { MESSAGES } from '../constants/message.constant';

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
  btnEdit = this.table.querySelector('.btn-edit');

  constructor() {
    this.handleUserLogout();
    this.showFormAddNewStudent();
    this.addEventForCreateButton();
    this.addEventForUpdateButton();
    this.cancelModalForm();
    this.handleRenderTable();
  }

  /**
   * Reset input and error message
   */
  resetForm() {
    this.form.reset();
    DocumentHelper.cleanErrorMessage(this.nameStudent);
    DocumentHelper.cleanErrorMessage(this.emailStudent);
    DocumentHelper.cleanErrorMessage(this.phoneStudent);
    DocumentHelper.cleanErrorMessage(this.phoneEnrollNumberStudent);
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

    ModalHelper.showModal(this.modalForm);
    this.nameStudent.value = studentData.name;
    this.emailStudent.value = studentData.email;
    this.phoneStudent.value = studentData.phone;
    this.phoneEnrollNumberStudent.value = studentData.enrollnumber;
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
        name: this.nameStudent.value,
        email: this.emailStudent.value,
        phone: this.phoneStudent.value,
        enrollnumber: this.phoneEnrollNumberStudent.value,
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
        DocumentHelper.showErrorMessage(this.nameStudent, validation.errors.name);
        DocumentHelper.showErrorMessage(this.emailStudent, validation.errors.email);
        DocumentHelper.showErrorMessage(this.phoneStudent, validation.errors.phone);
        DocumentHelper.showErrorMessage(this.phoneEnrollNumberStudent, validation.errors.enrollnumber);
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
        ModalHelper.hideModal(this.modalForm);
      }

    } catch (error) {
      alert('An error occurred while creating a new student', error)
    }
  }

  async handleUpdateForm() {
    try {
      const data = {
        name: this.nameStudent.value,
        email: this.emailStudent.value,
        phone: this.phoneStudent.value,
        enrollnumber: this.phoneEnrollNumberStudent.value,
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
        DocumentHelper.showErrorMessage(this.nameStudent, validation.errors.name);
        DocumentHelper.showErrorMessage(this.emailStudent, validation.errors.email);
        DocumentHelper.showErrorMessage(this.phoneStudent, validation.errors.phone);
        DocumentHelper.showErrorMessage(this.phoneEnrollNumberStudent, validation.errors.enrollnumber);
        DocumentHelper.showErrorMessage(this.dateOfAdmission, validation.errors.dateofadmission);
  
        return;
      } else {
        const filterDuplicateData = (data, key, value) => data.find((item) => item[key] === value)
        const duplicateEmail = filterDuplicateData(studentsList, 'email', data.email);
        const duplicatePhoneNumber = filterDuplicateData(studentsList, 'phone', data.phone);
        const duplicateEnrollNumber = filterDuplicateData(studentsList, 'enrollnumber', data.enrollnumber);
        let isContinue = true;
        if (duplicateEmail) {
          isContinue = false;
          DocumentHelper.showErrorMessage(this.emailStudent, MESSAGES.duplicateEmail);
        } 
        if (duplicatePhoneNumber) {
          isContinue = false;
          DocumentHelper.showErrorMessage(this.phoneStudent, MESSAGES.duplicatePhone);
        }
        if (duplicateEnrollNumber) {
          isContinue = false;
          DocumentHelper.showErrorMessage(this.phoneEnrollNumberStudent, MESSAGES.duplicateEnrollNumber);
        }
        if (!isContinue) {
          return;
        }
        
        const updateRow = document.querySelector(`[data-id="${formStudentId}"]`);
        const updateStudent = await StudentService.update(formStudentId, data);

        updateRow.innerHTML = StudentTemplate.renderTableRow(updateStudent);
        this.handleButtonsEdit();
        ModalHelper.hideModal(this.modalForm);
      }    
      
    } catch (error) {
      alert('Something went wrong while updating the student', error);
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

  addEventForUpdateButton() {
    // Movie will be updated when the update button is clicked
    this.btnUpdateStudent.addEventListener('click', async () => {
      await this.handleUpdateForm();
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

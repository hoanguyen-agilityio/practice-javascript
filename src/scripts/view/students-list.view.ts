// Import variable LOGIN_PAGE from file app.constant
import { LOGIN_PAGE } from '../constants/app.constant';

// Templates
import { StudentTemplate } from '../templates/student.template';

// Service
import { StudentService } from '../service/student.service';

// Helpers
import { ModalHelper } from '../helpers/modal.helper';
import { DocumentHelper } from '../helpers/document.helper';
import { LoaderHelper } from '../helpers/loader.helper';

// import { ModalHelper, DocumentHelper, LoaderHelper } from './helper'

// Validates
import { validate } from '../validates/form.validate';
import { EMPTY_TEXT, MESSAGES } from '../constants/message.constant';

// import { STUDENTS_LIST_PAGE } from '@/constants'
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
  formInput = this.modal.querySelectorAll('.form-input');
  modalConfirmDelete = document.querySelector('.modal-confirm-delete');
  modalConfirmDeleteBtnCancel = this.modalConfirmDelete.querySelector(
    '.btn-cancel',
  );
  modalContentDelete = this.modalConfirmDelete.querySelector(
    '.modal-content-delete',
  );
  btnDelete = this.modalConfirmDelete.querySelector('.btn-delete');
  sidebar = document.querySelector('.main-sidebar');
  btnShowSidebar = document.querySelector('.btn-show-sidebar');
  btnHideSidebar = document.querySelector('.btn-hide-sidebar');
  containerLoader = document.querySelector('.container-loader');
  loader = this.containerLoader.querySelector('.loader');

  constructor() {
    this.handleLogout();
    this.handleShowAddForm();
    this.handleAddEventForCreateButton();
    this.handleAddEventForUpdateButton();
    this.handleCancelModal();
    this.handleAddEventForDeleteButton();
    this.handleCancelModalConfirmDelete();
    this.handleRenderTable();
    this.handleAddEventForBtnShowSidebar();
    this.handleAddEventForBtnHideSidebar();
  }

  getValueForm() {
    return {
      name: this.name.value,
      email: this.email.value,
      phone: this.phone.value,
      enrollnumber: this.enrollNumber.value,
      dateofadmission: this.dateOfAdmission.value,
    };
  }

  getConfig() {
    return {
      name: ['empty', 'name'],
      email: ['empty', 'formatEmail'],
      phone: ['empty', 'phone'],
      enrollnumber: ['empty', 'phone'],
      dateofadmission: ['empty'],
    };
  }

  listErrorMessage = [
    {
      name: 'email',
      message: MESSAGES.DUPLICATE_EMAIL,
    },
    {
      name: 'phone',
      message: MESSAGES.DUPLICATE_PHONE,
    },
    {
      name: 'enrollnumber',
      message: MESSAGES.DUPLICATE_ENROLL_NUMBER,
    },
  ];

  async checkDuplicate(field, data) {
    const studentsList = await StudentService.getAll();
    return validate.checkDuplicateData(studentsList, field, data);
  }

  // showErr() {
  //   let isContinue = true;
  //   this.listErrorMessage.forEach(key => {
  //     if (this.checkDuplicate(toString(key.name), data.key.name)) {
  //       isContinue = false;
  //       DocumentHelper.showErrorMessage(this.key.name, key.message);
  //     } else {
  //       isContinue = true;
  //       DocumentHelper.showErrorMessage(this.key.name, EMPTY_TEXT);
  //       console.log(3);
  //     }

  //     if (!isContinue) {
  //       return;
  //     }
  //   });
  // }

  // checkDuplicate(arr,data) {
  //   let test = {
  //     duplicateEmail: validate.checkDuplicateData(
  //       arr,
  //       'email',
  //       data.email,
  //     ),
  //     isContinue: true
  //   };
  // const duplicateEmail = validate.checkDuplicateData(
  //   arr,
  //   'email',
  //   data.email,
  // );
  // let isContinue = true;

  // if (test.duplicateEmail) {
  //   test.isContinue = false
  //   DocumentHelper.showErrorMessage(this.email, MESSAGES.DUPLICATE_EMAIL);
  //   console.log(2)
  //   return;
  // }
  // else {
  //   test.isContinue = true
  //   DocumentHelper.showErrorMessage(this.email, EMPTY_TEXT);
  //   console.log(3)
  // }

  // if (!test.isContinue) {

  //   console.log(4)
  //   return;
  // }

  // if (duplicatePhone) {
  //   isContinue = false;
  //   DocumentHelper.showErrorMessage(this.phone, MESSAGES.DUPLICATE_PHONE);
  // } else {
  //   isContinue = true;
  //   DocumentHelper.showErrorMessage(this.email, EMPTY_TEXT);
  // }

  // if (enrollNumber) {
  //   isContinue = false;
  //   DocumentHelper.showErrorMessage(
  //     this.phone,
  //     MESSAGES.DUPLICATE_ENROLL_NUMBER,
  //   );
  // } else {
  //   isContinue = true;
  //   DocumentHelper.showErrorMessage(this.email, EMPTY_TEXT);
  // }

  // if (!isContinue) {
  //   return;
  // }
  // }

  /**
   * Reset input and error message
   */
  resetForm() {
    this.formInput.forEach(item => {
      item.value = EMPTY_TEXT;
    });
    const errorMessage = [
      this.name,
      this.email,
      this.phone,
      this.enrollNumber,
      this.dateOfAdmission,
    ];

    // Filter out and get each element in the array errorMessage
    errorMessage.forEach(item => {
      DocumentHelper.cleanErrorMessage(item);
    });
  }

  /**
   * Show sidebar, hide sidebar appear button and show sidebar hide button
   */
  showSidebar() {
    this.sidebar.classList.remove('hide-sidebar');
    this.btnShowSidebar.classList.add('hide');
    this.btnHideSidebar.classList.remove('btn-hide-sidebar');
  }

  /**
   * Event handling adds event to the show sidebar button
   */
  handleAddEventForBtnShowSidebar() {
    this.btnShowSidebar.addEventListener('click', () => {
      this.showSidebar();
    });
  }

  /**
   * Hide sidebar, hide sidebar hide button and show sidebar button
   */
  hideSidebar() {
    this.sidebar.classList.add('hide-sidebar');
    this.btnShowSidebar.classList.remove('hide');
    this.btnHideSidebar.classList.add('btn-hide-sidebar');
  }

  /**
   * Event handling adds event to the hide sidebar button
   */
  handleAddEventForBtnHideSidebar() {
    this.btnHideSidebar.addEventListener('click', () => {
      this.hideSidebar();
    });
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
    // DocumentHelper.disableBtn(this.btnUpdateStudent);
    this.form.setAttribute('data-id', studentId);
  }

  /**
   * Handle the edit form that appears when clicking on the edit button
   */
  handleButtonsEdit() {
    const btnEdits = document.querySelectorAll('.table-row .btn-edit');

    // Filter through each edit button
    btnEdits.forEach(item => {
      item.addEventListener('click', async () => {
        await this.showEditStudentModal(item);

        DocumentHelper.hideElement(this.btnCreateStudent);
        DocumentHelper.showElement(this.btnUpdateStudent);
      });
    });
  }

  /**
   * The deletion confirmation modal will appear when clicking the delete button
   *
   * @param {*} item - Table delete button
   */
  handleShowDeleteStudentModal(item) {
    const studentId = item.dataset.id;

    ModalHelper.showModal(this.modalConfirmDelete);
    this.modalContentDelete.setAttribute('data-id', studentId);
  }

  /**
   * Query to all delete buttons in the table
   */
  handleDeleteButtons() {
    const tableDeleteButtons = document.querySelectorAll('.btn-table-delete');

    tableDeleteButtons.forEach(item => {
      item.addEventListener('click', () => {
        this.handleShowDeleteStudentModal(item);
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

      result.forEach(student => {
        tableTemplate += StudentTemplate.renderTableRow(student);
      });

      this.tableRow.innerHTML = tableTemplate;
      this.handleButtonsEdit();
      this.handleDeleteButtons();
    } catch (error) {
      alert('An error occurred while getting student', error);
    }
  }

  /**
   * Handling create form  by calling API
   */
  async handleAddForm() {
    const data = this.getValueForm();
    const config = this.getConfig();
    const validation = validate.validateForm(data, config);

    DocumentHelper.showErrorMessage(this.name, validation.errors.name);
    DocumentHelper.showErrorMessage(this.email, validation.errors.email);
    DocumentHelper.showErrorMessage(this.phone, validation.errors.phone);
    DocumentHelper.showErrorMessage(
      this.enrollNumber,
      validation.errors.enrollnumber,
    );
    DocumentHelper.showErrorMessage(
      this.dateOfAdmission,
      validation.errors.dateofadmission,
    );

    this.studentsList.forEach(key => {
      console.log(key.name);
    });
    if (!validation.isValid) {
      return;
    }

    try {
      // Check entry requirements of all schools. If incorrect, output an error message
      // const duplicateEmail = validate.checkDuplicateData(
      //   studentsList,
      //   'email',
      //   data.email,
      // );
      // const duplicatePhone = validate.checkDuplicateData(
      //   studentsList,
      //   'phone',
      //   data.phone,
      // );
      // const duplicateEnrollNumber = validate.checkDuplicateData(
      //   studentsList,
      //   'enrollnumber',
      //   data.enrollnumber,
      // );
      // let isContinue = true;

      // if (duplicateEmail) {
      //   isContinue = false;
      //   DocumentHelper.showErrorMessage(this.email, MESSAGES.DUPLICATE_EMAIL);
      //   console.log(2);
      // } else {
      //   isContinue = true;
      //   DocumentHelper.showErrorMessage(this.email, EMPTY_TEXT);
      //   console.log(3);
      // }

      // if (duplicatePhone) {
      //   isContinue = false;
      //   DocumentHelper.showErrorMessage(this.phone, MESSAGES.DUPLICATE_PHONE);
      // } else {
      //   isContinue = true;
      //   DocumentHelper.showErrorMessage(this.phone, EMPTY_TEXT);
      // }

      // if (duplicateEnrollNumber) {
      //   isContinue = false;
      //   DocumentHelper.showErrorMessage(
      //     this.enrollNumber,
      //     MESSAGES.DUPLICATE_ENROLL_NUMBER,
      //   );
      // } else {
      //   isContinue = true;
      //   DocumentHelper.showErrorMessage(this.enrollNumber, EMPTY_TEXT);
      // }

      // if (!isContinue) {
      //   return;
      // }

      // Disable button
      DocumentHelper.disableBtn(this.btnCreateStudent);

      // Add newly created students to the database
      const newStudent = await StudentService.post(data);
      const insertRow = this.tableRow.insertRow();
      const newRow = insertRow;
      const hideRow = insertRow;

      // Add class for new row
      newRow.className = 'content-row';

      // Add class for hide row
      hideRow.className = 'spacer';

      // Set attribute for new row
      newRow.setAttribute('data-id', newStudent.id);

      // Hide modal
      ModalHelper.hideModal(this.modal);

      // Show loader
      LoaderHelper.showLoader(this.containerLoader);

      setTimeout(() => {
        // Hide loader
        LoaderHelper.hideLoader(this.containerLoader);

        // Display newly created students on the screen
        newRow.innerHTML = StudentTemplate.renderTableRow(newStudent);

        // Cancel the disable button
        DocumentHelper.removeDisableBtn(this.btnCreateStudent);
      }, 2000);
    } catch (error) {
      alert('An error occurred while creating a new student', error);
    }
  }

  /**
   * Handling update form  by calling API
   */
  async handleUpdateForm() {
    // Get value and validate
    const data = this.getValueForm();
    const config = this.getConfig();
    const validation = validate.validateForm(data, config);

    // Show errors
    DocumentHelper.disableBtn(this.btnUpdateStudent);
    DocumentHelper.showErrorMessage(this.name, validation.errors.name);
    DocumentHelper.showErrorMessage(this.email, validation.errors.email);
    DocumentHelper.showErrorMessage(this.phone, validation.errors.phone);
    DocumentHelper.showErrorMessage(
      this.enrollNumber,
      validation.errors.enrollnumber,
    );
    DocumentHelper.showErrorMessage(
      this.dateOfAdmission,
      validation.errors.dateofadmission,
    );
    // DocumentHelper.disableBtn(this.btnUpdateStudent);
    // if (data.name === data.name ||data.email === data.email || data.phone === data.phone || data.enrollnumber === data.enrollnumber) {
    //   DocumentHelper.disableBtn(this.btnUpdateStudent);

    // }

    if (!validation.isValid) {
      return;
    }
    // Write a util to use Generic for e.g Student or Product
    const studentsList = await StudentService.getAll();
    const newStudentsList = studentsList.map(student => {
      const email = student.email;
      const phone = student.phone;
      const enrollNumber = student.enrollnumber;

      return { email, phone, enrollNumber };
    });
    console.log(newStudentsList);
    console.log(this.email === this.email, 1);

    try {
      // const studentsList = await StudentService.getAll();
      // const newStudentsList = studentsList.map((student) => {
      //  const email = student.email;
      //  const phone = student.phone;
      //  const enrollNumber = student.enrollnumber;

      //  return {email, phone, enrollNumber}
      // });
      const formStudentId = this.form.getAttribute('data-id');

      // Check entry requirements of all schools. If incorrect, output an error message
      const duplicateEmail = validate.checkDuplicateData(
        newStudentsList,
        'email',
        data.email,
      );
      const duplicatePhone = validate.checkDuplicateData(
        newStudentsList,
        'phone',
        data.phone,
      );
      const duplicateEnrollNumber = validate.checkDuplicateData(
        newStudentsList,
        'enrollnumber',
        data.enrollnumber,
      );
      let isContinue = true;
      console.log(duplicateEmail.email, 'hhhhh');
      if (duplicateEmail.email != data.email) {
        isContinue = false;
        DocumentHelper.showErrorMessage(this.email, MESSAGES.DUPLICATE_EMAIL);
      } else {
        isContinue = true;
        DocumentHelper.showErrorMessage(this.email, EMPTY_TEXT);
      }

      if (duplicatePhone) {
        isContinue = false;
        DocumentHelper.showErrorMessage(this.phone, MESSAGES.DUPLICATE_PHONE);
      } else {
        isContinue = true;
        DocumentHelper.showErrorMessage(this.phone, EMPTY_TEXT);
      }

      if (duplicateEnrollNumber) {
        isContinue = false;
        DocumentHelper.showErrorMessage(
          this.enrollNumber,
          MESSAGES.DUPLICATE_ENROLL_NUMBER,
        );
      } else {
        isContinue = true;
        DocumentHelper.showErrorMessage(this.enrollNumber, EMPTY_TEXT);
      }

      if (!isContinue) {
        return;
      }

      // Disable button
      DocumentHelper.disableBtn(this.btnUpdateStudent);
      const updateRow = document.querySelector(`[data-id="${formStudentId}"]`);
      const updateStudent = await StudentService.update(formStudentId, data);

      ModalHelper.hideModal(this.modal);

      // Show loader
      LoaderHelper.showLoader(this.containerLoader);

      setTimeout(() => {
        // Hide loader
        LoaderHelper.hideLoader(this.containerLoader);

        // Show updated data on screen
        updateRow.innerHTML = StudentTemplate.renderTableRow(updateStudent);
        this.handleButtonsEdit();
        this.handleDeleteButtons();

        // Cancel the disable button
        // DocumentHelper.removeDisableBtn(this.btnUpdateStudent);
      }, 2000);
    } catch (error) {
      alert('Something went wrong while updating the student', error);
    }
  }

  /**
   * Handle movie by calling API
   */
  async handleDeleteStudent() {
    const modalContentDeleteId = this.modalContentDelete.getAttribute(
      'data-id',
    );
    const deleteRow = document.querySelector(
      `[data-id="${modalContentDeleteId}"]`,
    );

    await StudentService.delete(modalContentDeleteId);
    deleteRow.remove();
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
   * Handle the deletion of the student when the user presses the delete button
   */
  handleAddEventForDeleteButton() {
    this.btnDelete.addEventListener('click', () => {
      // Hide modal
      ModalHelper.hideModal(this.modalConfirmDelete);

      // Show loader
      LoaderHelper.showLoader(this.containerLoader);
      setTimeout(async () => {
        // Hide loader
        LoaderHelper.hideLoader(this.containerLoader);
        await this.handleDeleteStudent();
      }, 2000);
    });
  }

  /**
   * Handle the event when the user clicks on the cancel button, the form will be hidden
   */
  handleCancelModal() {
    this.btnCancel.addEventListener('click', () => {
      ModalHelper.hideModal(this.modal);
      this.resetForm();
    });
  }

  /**
   * Handle the event when the user clicks on the cancel button, the form will be hidden
   */
  handleCancelModalConfirmDelete() {
    this.modalConfirmDeleteBtnCancel.addEventListener('click', () => {
      ModalHelper.hideModal(this.modalConfirmDelete);
    });
  }

  /**
   * Handle logout when the user clicks the logout button
   */
  handleLogout() {
    this.btnLogout.addEventListener('click', () => {
      window.location.href = LOGIN_PAGE;
    });
  }
}

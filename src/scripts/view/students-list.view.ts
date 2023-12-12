// Import variable LOGIN_PAGE from file app.constant
import { LOGIN_PAGE } from '@/constant';

// Templates
import { StudentTemplate } from '@/templates';

// Service
import { StudentService } from '@/service';

// Helpers
import { 
  ModalHelper,
  DocumentHelper,
  LoaderHelper
} from '@/helpers';

// Validates
import { validate } from '@/validates';

// Constants
import { 
  EMPTY_TEXT, 
  MESSAGES 
} from '@/constant';

// Interfaces
import { ConfigValidation, Student, ErrorMessage } from '@/interface'

// import { STUDENTS_LIST_PAGE } from '@/constants'
export class StudentsList {
  mainSidebar = document.querySelector('#mainsidebar');
  containerPageStudentsList = document.querySelector('.container-page-students-list');
  containerContent = this.containerPageStudentsList.querySelector('.container-content');
  modal = document.querySelector('.modal-form');
  listHeading = document.querySelector('.list-heading');
  btnLogout = this.mainSidebar.querySelector('.btn-logout');
  table = this.containerContent.querySelector('.students-list-table');
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
  searchField = this.containerContent.querySelector('.search-field');

  constructor() {
    this.handleLogout();
    this.handleAddEventSearch();
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

  getValueForm(): Student {
    return {
      name: (this.name as HTMLInputElement).value,
      email: (this.email as HTMLInputElement).value,
      phone: (this.phone as HTMLInputElement).value,
      enrollNumber: (this.enrollNumber as HTMLInputElement).value,
      dateOfAdmission: (this.dateOfAdmission as HTMLInputElement).value,
    };
  }

  getConfig(): ConfigValidation {
    return {
      name: ['empty', 'name'],
      email: ['empty', 'formatEmail'],
      phone: ['empty', 'phone'],
      enrollNumber: ['empty', 'phone'],
      dateOfAdmission: ['empty'],
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

  async checkDuplicate(field: string, data: string) {
    const studentsList = await StudentService.getAll();
    return validate.checkDuplicateData(studentsList, field, data);
  }

  /**
   * Reset input and error message
   */
  resetForm(): void {
    this.formInput.forEach(item => {
      (item as HTMLInputElement).value = EMPTY_TEXT;
    });

    const errorMessage: Element[] = [
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
  showSidebar(): void {
    this.sidebar.classList.remove('hide-sidebar');
    this.btnShowSidebar.classList.add('hide');
    this.btnHideSidebar.classList.remove('btn-hide-sidebar');
    this.containerContent.classList.add('set-width-container-content');
  }

  /**
   * Event handling adds event to the show sidebar button
   */
  handleAddEventForBtnShowSidebar(): void {
    this.btnShowSidebar.addEventListener('click', () => {
      this.showSidebar();
    });
  }

  /**
   * Hide sidebar, hide sidebar hide button and show sidebar button
   */
  hideSidebar(): void {
    this.sidebar.classList.add('hide-sidebar');
    this.btnShowSidebar.classList.remove('hide');
    this.btnHideSidebar.classList.add('btn-hide-sidebar');
    this.containerContent.classList.remove('set-width-container-content');
  }

  /**
   * Event handling adds event to the hide sidebar button
   */
  handleAddEventForBtnHideSidebar(): void {
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
    const studentData = await StudentService.getById(studentId) as ErrorMessage;

    ModalHelper.showModal(this.modal);
    (this.name as HTMLInputElement).value = studentData.name;
    (this.email as HTMLInputElement).value = studentData.email;
    (this.phone as HTMLInputElement).value = studentData.phone;
    (this.enrollNumber as HTMLInputElement).value = studentData.enrollNumber;
    (this.dateOfAdmission as HTMLInputElement).value = studentData.dateOfAdmission;
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
    const studentId: string = item.dataset.id;

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

  async handleRenderRow() {
    const result: Student[] = await StudentService.getAll();
    let tableTemplate = StudentTemplate.renderTableThead();

      result.forEach(student => {
        tableTemplate += StudentTemplate.renderTableRow(student);
      });

      this.table.innerHTML = tableTemplate;
      this.handleButtonsEdit();
      this.handleDeleteButtons();
  }

  /**
   * Handling getting data from the API and displaying it on a table in HTML
   */
  async handleRenderTable(): Promise<void> {
    try {
      this.handleRenderRow()
    } catch (error) {
      alert('An error occurred while getting student');
    }
  }

  /**
   * Handling create form  by calling API
   */
  async handleAddForm(): Promise<void> {
    const data: Student = this.getValueForm();
    const config: ConfigValidation = this.getConfig();
    const validation = validate.validateForm(data, config);
    const studentsList = await StudentService.getAll();

    DocumentHelper.showErrorMessage(this.name, validation.errors.name);
    DocumentHelper.showErrorMessage(this.email, validation.errors.email);
    DocumentHelper.showErrorMessage(this.phone, validation.errors.phone);
    DocumentHelper.showErrorMessage(
      this.enrollNumber,
      validation.errors.enrollNumber,
    );
    DocumentHelper.showErrorMessage(
      this.dateOfAdmission,
      validation.errors.dateOfAdmission,
    );

    if (!validation.isValid) {
      return;
    }

    try {
      // Check entry requirements of all schools. If incorrect, output an error message
      const duplicateEmail = validate.checkDuplicateData(
        studentsList,
        'email',
        data.email,
      );
      const duplicatePhone = validate.checkDuplicateData(
        studentsList,
        'phone',
        data.phone,
      );
      const duplicateEnrollNumber = validate.checkDuplicateData(
        studentsList,
        'enrollnumber',
        data.enrollNumber,
      );
      let isContinue = true;

      if (duplicateEmail) {
        isContinue = false;
        DocumentHelper.showErrorMessage(this.email, MESSAGES.DUPLICATE_EMAIL);

        return;
      } else {
        isContinue = true;
        DocumentHelper.showErrorMessage(this.email, EMPTY_TEXT);
      }

      if (duplicatePhone) {
        isContinue = false;
        DocumentHelper.showErrorMessage(this.phone, MESSAGES.DUPLICATE_PHONE);

        return;
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

        return;
      } else {
        isContinue = true;
        DocumentHelper.showErrorMessage(this.enrollNumber, EMPTY_TEXT);
      }

      if (!isContinue) {
        return;
      }

      // Add newly created students to the database
      const newStudent = await StudentService.post(data);
      
      // Disable button
      DocumentHelper.disableBtn(this.btnCreateStudent);
  
      // Hide modal
      ModalHelper.hideModal(this.modal);
  
      // Show loader
      LoaderHelper.showLoader(this.containerLoader);
  
      setTimeout(() => {
        const insertRow = StudentTemplate.renderTableRow(newStudent)
          
        // Hide loader
        LoaderHelper.hideLoader(this.containerLoader);

        // Cancel the disable button
        DocumentHelper.removeDisableBtn(this.btnCreateStudent);
  
        // Display newly created students on the screen
        this.handleRenderRow() = insertRow;

      }, 2000);
    } catch (error) {
      console.log('error when adding', error)
      alert('An error occurred while creating a new student');
    }
  }

  /**
   * Handling update form  by calling API
   */
  async handleUpdateForm(): Promise<void> {
    // Func1: Get value and validate
    const data: Student = this.getValueForm();
    const config: ConfigValidation = this.getConfig();
    const validation = validate.validateForm(data, config);

    // Func2: Show errors
    DocumentHelper.disableBtn(this.btnUpdateStudent);
    DocumentHelper.showErrorMessage(this.name, validation.errors.name);
    DocumentHelper.showErrorMessage(this.email, validation.errors.email);
    DocumentHelper.showErrorMessage(this.phone, validation.errors.phone);
    DocumentHelper.showErrorMessage(
      this.enrollNumber,
      validation.errors.enrollNumber,
    );
    DocumentHelper.showErrorMessage(
      this.dateOfAdmission,
      validation.errors.dateOfAdmission,
    );

    if (!validation.isValid) {
      return;
    }
    // Write a util to use Generic for e.g Student or Product
    const studentsList: Student[] = await StudentService.getAll();

    const newStudentsList: Student[] = studentsList.map(student => {
      const email: string = student.email;
      const phone: string = student.phone;
      const enrollNumber: string = student.enrollNumber;

      return { email, phone, enrollNumber };
    });

    try {
      const formStudentId = this.form.getAttribute('data-id');
      const updateRow: Element = document.querySelector(`[data-id="${formStudentId}"]`);

      // Check entry requirements of all schools. If incorrect, output an error message
      // Func3: check duplicate record
      // [{
      //   key: 'email',
      //   value: data.email
      // }].forEach((item)=> {
      //   validate.checkDuplicateData(
      //     newStudentsList,
      //     item.key,
      //     item.value,
      //   )
      // })
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
        data.enrollNumber,
      );
      let isContinue = true;
      
      if (duplicateEmail) {
        isContinue = false;
        DocumentHelper.showErrorMessage(this.email, MESSAGES.DUPLICATE_EMAIL);

        return;
      } else {
        isContinue = true;
        DocumentHelper.showErrorMessage(this.email, EMPTY_TEXT);
      }

      if (duplicatePhone) {
        isContinue = false;
        DocumentHelper.showErrorMessage(this.phone, MESSAGES.DUPLICATE_PHONE);

        return;
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

        return;
      } else {
        isContinue = true;
        DocumentHelper.showErrorMessage(this.enrollNumber, EMPTY_TEXT);
      }

      if (!isContinue) {
        return;
      }

      // Disable button
      // DocumentHelper.disableBtn(this.btnUpdateStudent);
      
      const updateStudent: Student = await StudentService.update(formStudentId, data);

      ModalHelper.hideModal(this.modal);

      // Show loader
      LoaderHelper.showLoader(this.containerLoader);

      setTimeout(() => {
        // Hide loader
        LoaderHelper.hideLoader(this.containerLoader);

        // Show updated data on screen
        updateRow.innerHTML = StudentTemplate.renderTableRowContent(updateStudent);
        this.handleButtonsEdit();
        this.handleDeleteButtons();
        
        // Cancel the disable button
        DocumentHelper.removeDisableBtn(this.btnUpdateStudent);
      }, 2000);
    } catch (error) {
      alert('Something went wrong while updating the student');
    }
  }

  /**
   * Handle movie by calling API
   */
  async handleDeleteStudent(): Promise<void> {
    const modalContentDeleteId: string = this.modalContentDelete.getAttribute(
      'data-id',
    );
    const deleteRow: Element = document.querySelector(
      `[data-id="${modalContentDeleteId}"]`,
    );

    await StudentService.delete(modalContentDeleteId);
    deleteRow.remove();
  }

  /**
   * Handle the event when clicking on the add student button, the add student form will appear
   */
  handleShowAddForm(): void {
    this.btnShowFormAddStudent.addEventListener('click', () => {
      ModalHelper.showModal(this.modal);
      DocumentHelper.hideElement(this.btnUpdateStudent);
      DocumentHelper.showElement(this.btnCreateStudent);
      this.resetForm();
    });
  }

  /**
   * Handle search
   */
  handleSearch() {
    const searchField = document.querySelector('.search-field');
    const table = document.querySelector('.students-list-table');
    const tableRow = table.getElementsByTagName('li');
    const filter = (searchField as HTMLInputElement)?.value?.toUpperCase();
    
    for (let i = 0; i < tableRow.length; i++) {
      const content = tableRow[i].getElementsByTagName("span")[1];  
      const txtValue = content?.textContent || content?.innerText;

        if (txtValue?.toUpperCase().indexOf(filter) > -1) {
          tableRow[i].style.display = "";
        } else {
          tableRow[i].style.display = "none";
        }
    }
  }

  /**
   * Handle add event search
   */
  handleAddEventSearch() {
    this.searchField.addEventListener("keyup", this.handleSearch);
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

  handleAddEventForUpdateButton(): void {
    // Movie will be updated when the update button is clicked
    this.btnUpdateStudent.addEventListener('click', async () => {
      await this.handleUpdateForm();
    });
  }

  /**
   * Handle the deletion of the student when the user presses the delete button
   */
  handleAddEventForDeleteButton(): void {
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
  handleCancelModal(): void {
    this.btnCancel.addEventListener('click', () => {
      ModalHelper.hideModal(this.modal);
      
      // Cancel the disable button
      DocumentHelper.removeDisableBtn(this.btnUpdateStudent);
      this.resetForm();
    });
  }

  /**
   * Handle the event when the user clicks on the cancel button, the form will be hidden
   */
  handleCancelModalConfirmDelete(): void {
    this.modalConfirmDeleteBtnCancel.addEventListener('click', () => {
      ModalHelper.hideModal(this.modalConfirmDelete);
    });
  }

  /**
   * Handle logout when the user clicks the logout button
   */
  handleLogout(): void {
    this.btnLogout.addEventListener('click', () => {
      window.location.href = LOGIN_PAGE;
    });
  }
}

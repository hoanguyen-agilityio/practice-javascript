// Templates
import { StudentTemplate } from '@/templates';

// Service
import { StudentService } from '../services';

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
  LOGIN_PAGE,
  EMPTY_TEXT,
  MESSAGES,
  ADD_STUDENT,
  UPDATE_STUDENT
} from '@/constants';

// Interfaces
import {
  PartialConfigValidation,
  PartialUser,
  PartialStudent,
	Student,
} from '@/interfaces'

// import { STUDENTS_LIST_PAGE } from '@/constants'
export class StudentsList {
  mainSidebar = document.querySelector('#mainsidebar');
  containerPageStudentsList = document.querySelector('.container-page-students-list');
  containerContent = this.containerPageStudentsList.querySelector('.container-content');
  modal = document.querySelector('.modal-form');
  listHeading = document.querySelector('.list-heading');
  btnLogout = this.mainSidebar.querySelector('.btn-logout');
  table = this.containerContent.querySelector('.students-list-table');
  btnCreateStudent = this.modal.querySelector('.btn-create-student') as HTMLButtonElement;
  btnUpdateStudent = this.modal.querySelector('.btn-update-student') as HTMLButtonElement;
  name = this.modal.querySelector('input[name="name-student"]') as HTMLInputElement;
  email = this.modal.querySelector('input[name="email"]') as HTMLInputElement;
  phone = this.modal.querySelector('input[name="phone"]') as HTMLInputElement;
  enrollNumber = this.modal.querySelector('input[name="phone-enroll-number"]') as HTMLInputElement;
  dateOfAdmission = this.modal.querySelector('input[name="date-of-admission"]') as HTMLInputElement;
  form = this.modal.querySelector('.form') as HTMLFormElement;
  modalConfirmDelete = document.querySelector('.modal-confirm-delete');
  modalContentDelete = this.modalConfirmDelete.querySelector(
    '.modal-content-delete',
  );
  sidebar = document.querySelector('.main-sidebar');
  btnShowSidebar = document.querySelector('.btn-show-sidebar');
  btnHideSidebar = document.querySelector('.btn-hide-sidebar');
  containerLoader = document.querySelector('.container-loader');
  searchField = this.containerContent.querySelector('.search-field');
  titleForm = this.modal.querySelector('.title-form-add-update');

  constructor() {
    this.handleLogout();
    this.handleAddEventSearch();
    this.handleShowAddForm();
    this.handleAddEventForCreateButton();
    this.handleAddEventForUpdateButton();
    this.handleCancelModal();
    this.handleCloseModal();
    this.handleCloseModalConfirmDelete();
    this.handleAddEventForDeleteButton();
    this.handleCancelModalConfirmDelete();
    this.handleRenderTable();
    this.handleAddEventForBtnShowSidebar();
    this.handleAddEventForBtnHideSidebar();
  }

  getValueForm(): PartialStudent {
    return {
      name: this.name.value,
      email: this.email.value,
      phone: this.phone.value,
      enrollNumber: this.enrollNumber.value,
      dateOfAdmission: this.dateOfAdmission.value,
    };
  }

  getConfig(): PartialConfigValidation {
    return {
      name: ['empty', 'name'],
      email: ['empty', 'formatEmail'],
      phone: ['empty', 'phone'],
      enrollNumber: ['empty', 'phone'],
      dateOfAdmission: ['empty'],
    };
  }

  async checkDuplicate(field: string, data: string): Promise<PartialStudent> {
    const studentsList: PartialStudent[] = await StudentService.getAll();
    return validate.checkDuplicateData(studentsList, field, data);
  }

  /**
   * Reset input and error message
   */
  resetForm(): void {
		DocumentHelper.cleanErrorMessage(this.name);
		DocumentHelper.cleanErrorMessage(this.email);
		DocumentHelper.cleanErrorMessage(this.phone);
		DocumentHelper.cleanErrorMessage(this.enrollNumber);
		DocumentHelper.cleanErrorMessage(this.dateOfAdmission);

		this.form.reset();
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
   * @param {HTMLButtonElement} item - Edit buttons
   */
  async showEditStudentModal(item: HTMLButtonElement): Promise<void> {
    const studentId: string = item.dataset.id;
    const studentData: PartialStudent = await StudentService.getById(studentId);

    ModalHelper.showModal(this.modal);
    this.name.value = studentData.name;
    this.email.value = studentData.email;
    this.phone.value = studentData.phone;
    this.enrollNumber.value = studentData.enrollNumber;
    this.dateOfAdmission.value = studentData.dateOfAdmission;
    this.form.setAttribute('data-id', studentId);
  }

  /**
   * Handle the edit form that appears when clicking on the edit button
   */
  handleButtonsEdit(): void {
    const btnEdits: NodeListOf<Element> = document.querySelectorAll('.table-row .btn-edit');

    // Filter through each edit button
    btnEdits.forEach((item: HTMLButtonElement) => {
      item.addEventListener('click', async () => {
        await this.showEditStudentModal(item);
        this.titleForm.innerHTML = UPDATE_STUDENT;
        DocumentHelper.hideElement(this.btnCreateStudent);
        DocumentHelper.showElement(this.btnUpdateStudent);
      });
    });
  }

  /**
   * The deletion confirmation modal will appear when clicking the delete button
   *
   * @param {HTMLButtonElement} item - Table delete button
   */
  handleShowDeleteStudentModal(item: HTMLButtonElement) {
    const studentId: string = item.dataset.id;

    ModalHelper.showModal(this.modalConfirmDelete);
    this.modalContentDelete.setAttribute('data-id', studentId);
  }

  /**
   * Query to all delete buttons in the table
   */
  handleDeleteButtons(): void {
    const tableDeleteButtons: NodeListOf<Element> = document.querySelectorAll('.btn-table-delete');

    tableDeleteButtons.forEach((item: HTMLButtonElement) => {
      item.addEventListener('click', () => {
        this.handleShowDeleteStudentModal(item);
      });
    });
  }

	/**
	 * Handle render row
	 */
  async handleRenderRow(): Promise<void> {
    const result: PartialStudent[] = await StudentService.getAll();
    let tableTemplate: string = StudentTemplate.renderTableThead();

      result.forEach((student: Student) => {
        tableTemplate += StudentTemplate.renderTableRow(student);
      });

      this.table.innerHTML = tableTemplate;
			this.handleButtonsEdit();
			this.handleDeleteButtons();
  }

  /**
   * Handling getting data from the API and displaying it on a table in HTML
   */
  handleRenderTable(): void {
    try {
      this.handleRenderRow()
    } catch (error) {
      alert('An error occurred while getting student');
    }
  }

	/**
	 * Get data and validate
	 */
	getDataAndValidate(): { isValid: boolean; errors: PartialUser; } {
    const data: PartialStudent = this.getValueForm();
    const config: PartialConfigValidation = this.getConfig();

		return validate.validateForm(data, config);
	}

  /**
   * Handles undisable button when new data is passed into the input
   */
  handleChangInput() {
    const name = this.name.addEventListener('change', () => {
      DocumentHelper.removeDisableElement(this.btnCreateStudent);
      DocumentHelper.removeDisableElement(this.btnUpdateStudent);
    });
    const email = this.email.addEventListener('change', () => {
      DocumentHelper.removeDisableElement(this.btnCreateStudent);
      DocumentHelper.removeDisableElement(this.btnUpdateStudent);
    });
    const phone = this.phone.addEventListener('change', () => {
      DocumentHelper.removeDisableElement(this.btnCreateStudent);
      DocumentHelper.removeDisableElement(this.btnUpdateStudent);
    });
    const enrollNumber = this.enrollNumber.addEventListener('change', () => {
      DocumentHelper.removeDisableElement(this.btnCreateStudent);
      DocumentHelper.removeDisableElement(this.btnUpdateStudent);
    });
    const dateOfAdmission = this.dateOfAdmission.addEventListener('change', () => {
      DocumentHelper.removeDisableElement(this.btnCreateStudent);
      DocumentHelper.removeDisableElement(this.btnUpdateStudent);
    });

    return { name, email, phone, enrollNumber, dateOfAdmission }
  }

	/**
	 * show error messages for checking for empty, wrong format,...
	 */
	showError(): void {
		DocumentHelper.showErrorMessage(this.name, this.getDataAndValidate().errors.name);
    DocumentHelper.showErrorMessage(this.email, this.getDataAndValidate().errors.email);
    DocumentHelper.showErrorMessage(this.phone, this.getDataAndValidate().errors.phone);
    DocumentHelper.showErrorMessage(
      this.enrollNumber,
      this.getDataAndValidate().errors.enrollNumber,
    );
    DocumentHelper.showErrorMessage(
      this.dateOfAdmission,
      this.getDataAndValidate().errors.dateOfAdmission,
    );
	}

	/**
	 * Check duplicate data
	 *
	 * @param {Array[]} arr - The array contains student information
	 */
	checkDuplicateData(arr: PartialStudent[]): boolean {
		const data: PartialStudent = this.getValueForm();

		// Check for duplicate emails
		const duplicateEmail: PartialStudent = validate.checkDuplicateData(
			arr,
			'email',
			data.email,
		);

		// Check for duplicate phones
		const duplicatePhone: PartialStudent = validate.checkDuplicateData(
			arr,
			'phone',
			data.phone,
		);

		// Check for duplicate enroll numbers
		const duplicateEnrollNumber: PartialStudent = validate.checkDuplicateData(
			arr,
			'enrollnumber',
			data.enrollNumber,
		);

		let isContinue: boolean = true;

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

		return isContinue;
	}

  /**
   * Handling create form  by calling API
   */
  async handleAddForm(): Promise<void> {
    const data: PartialStudent = this.getValueForm();
    const studentsList: PartialStudent[] = await StudentService.getAll();

    DocumentHelper.disableElement(this.btnCreateStudent);
    this.handleChangInput();
		this.showError();

		if (!this.getDataAndValidate().isValid) {

      return;
    }

    try {
			if(!this.checkDuplicateData(studentsList)) {

				return;
			}

      // Add newly created students to the database
      const newStudent: PartialStudent = await StudentService.post(data);

      // Hide modal
      ModalHelper.hideModal(this.modal);

      // Show loader
      LoaderHelper.showLoader(this.containerLoader);

      setTimeout(() => {
        // Hide loader
        LoaderHelper.hideLoader(this.containerLoader);

				const prevTable = this.table.innerHTML;
				const newItem = StudentTemplate.renderTableRow(newStudent);

				// Display newly created students on the screen
				this.table.innerHTML= `${prevTable} ${newItem}`;
				this.handleButtonsEdit();
				this.handleDeleteButtons();
      }, 2000);
    } catch (error) {
      alert('An error occurred while creating a new student');
    }
  }

  /**
   * Handling update form  by calling API
   */
  async handleUpdateForm(): Promise<void> {

		const data: PartialStudent = this.getValueForm();
		const studentsList: PartialStudent[] = await StudentService.getAll();

    DocumentHelper.disableElement(this.btnUpdateStudent);
    this.handleChangInput();
    this.showError();

    if (!this.getDataAndValidate().isValid) {

      return;
    }

    try {
      const formStudentId: string = this.form.getAttribute('data-id');
      const updateRow: Element = document.querySelector(`[data-id="${formStudentId}"]`);
      const newStudentsList: PartialStudent[] = studentsList.filter((student: PartialStudent) => {

        return student.id !== formStudentId;
      })

			if(!this.checkDuplicateData(newStudentsList)) {

				return;
			}

      const updateStudent: PartialStudent = await StudentService.update(formStudentId, data);

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
    const btnShowFormAddStudent = this.listHeading.querySelector('.btn-add-student');

    btnShowFormAddStudent.addEventListener('click', () => {
      ModalHelper.showModal(this.modal);
      DocumentHelper.hideElement(this.btnUpdateStudent);
      DocumentHelper.showElement(this.btnCreateStudent);
      this.titleForm.innerHTML = ADD_STUDENT;

      this.resetForm();
    });
  }

  /**
   * Handle search
   */
  handleSearch(): void {
    const searchField: Element = document.querySelector('.search-field');
    const table: Element = document.querySelector('.students-list-table');
    const tableRow: HTMLCollectionOf<HTMLLIElement> = table.getElementsByTagName('li');
    const filter: string = (searchField as HTMLInputElement)?.value?.toUpperCase();

    for (let i = 0; i < tableRow.length; i++) {
      const content: HTMLSpanElement = tableRow[i].getElementsByTagName("span")[1];
      const txtValue: string = content?.textContent || content?.innerText;

        if (txtValue?.toUpperCase().indexOf(filter) > -1) {
					tableRow[i].style.display = '';
        } else {
          tableRow[i].style.display = 'none';
        }
    }
  }

  /**
   * Handle add event search
   */
  handleAddEventSearch(): void {
    this.searchField.addEventListener("keyup", this.handleSearch);
  }

  /**
   * Add event for create button
   */
  handleAddEventForCreateButton(): void {
    // New student will be created when clicking create button
    this.btnCreateStudent.addEventListener('click', async () => {
      await this.handleAddForm();
    });
  }

  /**
   * Handle add event for update button
   */
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
    const btnDelete = this.modalConfirmDelete.querySelector('.btn-delete');

    btnDelete.addEventListener('click', () => {
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
    const btnCancel = this.modal.querySelector('.btn-cancel');

    btnCancel.addEventListener('click', () => {
      ModalHelper.hideModal(this.modal);
      DocumentHelper.removeDisableElement(this.btnCreateStudent);
      DocumentHelper.removeDisableElement(this.btnUpdateStudent);

      this.resetForm();
    });
  }

  /**
   * Handle the event when the user clicks on the close button, the form will be hidden
   */
  handleCloseModal(): void {
    const btnCloseModal = this.modal.querySelector('.btn-close-modal');

    btnCloseModal.addEventListener('click', () => {
      ModalHelper.hideModal(this.modal);
      DocumentHelper.removeDisableElement(this.btnCreateStudent);
      DocumentHelper.removeDisableElement(this.btnUpdateStudent);

      this.resetForm();
    })
  }

  /**
   * Handle the event when the user clicks on the close button, the form will be hidden
   */
  handleCloseModalConfirmDelete(): void {
    const btnCloseModalConfirmDelete = this.modalConfirmDelete.querySelector('.btn-close-modal');

    btnCloseModalConfirmDelete.addEventListener('click', () => {
      ModalHelper.hideModal(this.modalConfirmDelete);
    })
  }

  /**
   * Handle the event when the user clicks on the cancel button, the form will be hidden
   */
  handleCancelModalConfirmDelete(): void {
    const btnCancelModalConfirmDelete = this.modalConfirmDelete.querySelector(
      '.btn-cancel',
    );

    btnCancelModalConfirmDelete.addEventListener('click', () => {
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

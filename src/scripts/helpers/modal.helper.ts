export class ModalHelper {
  /**
   * Hide modal
   *
   * @param {HTMLElement} element - Element of modal
   */
  static hideModal(element) {
    element.classList.remove('modal-show');
  }

  /**
   * Show modal
   *
   * @param {HTMLElement} element - Element of modal
   */
  static showModal(element) {
    element.classList.add('modal-show');
  }
}

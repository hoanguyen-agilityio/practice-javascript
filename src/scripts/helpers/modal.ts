export class ModalHelper {
  /**
   * Hide modal
   *
   * @param {HTMLElement} element - Element of modal
   */
  static hideModal(element: Element) {
    element.classList.remove('modal-show');
  }

  /**
   * Show modal
   *
   * @param {HTMLElement} element - Element of modal
   */
  static showModal(element: Element) {
    element.classList.add('modal-show');
  }
}

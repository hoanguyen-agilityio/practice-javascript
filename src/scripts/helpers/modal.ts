export class ModalHelper {
  /**
   * Hide modal
   *
   * @param {Element} element - Element of modal
   */
  static hideModal(element: Element): void {
    element.classList.remove('modal-show');
  }

  /**
   * Show modal
   *
   * @param {Element} element - Element of modal
   */
  static showModal(element: Element): void {
    element.classList.add('modal-show');
  }
}
